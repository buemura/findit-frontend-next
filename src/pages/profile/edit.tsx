import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../../styles/pages/profile";

export default function Profile() {
  const router = useRouter();

  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [about_me, setAboutMe] = useState("");
  const [user_photo, setUserPhoto] = useState("");

  /**
   * JWT token is needed in order to make a POST, PUT or DELETE request.
   * Also this token expires in 1 hour. So you will need to Sign in again to generate a new one.
   * The token is associated with the user that Signed in.
   * So if we decode this token we will be able to retrieve user ID and Email.
   */
  const token = localStorage.getItem("token");
  const tokenDecoded: any = jwt_decode(token);
  const { id, exp } = tokenDecoded;

  // Check the session expiration with jwt.exp.
  const checkSessionExpiration = () => {
    const currentTimestamp = new Date().getTime() / 1000;

    if (exp < currentTimestamp) {
      alert("Your session expired, Sign in again to continue!");
      router.push("/login");
    }
    return;
  };

  // Update profile by sending a PUT request do backend API.
  const updateProfile = () => {
    checkSessionExpiration();
    axios
      .put(
        `http://localhost:4000/api/users/${id}`,
        {
          name,
          email,
          location,
          phone,
          occupation,
          about_me,
          user_photo,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        router.push("/profile");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to Update user!");
      });
  };

  useEffect(() => {
    checkSessionExpiration();
    setHasPhoto(false);
    axios
      .get(`http://localhost:4000/api/users/${id}`)
      .then(({ data }) => {
        setName(data.name);
        setEmail(data.email);
        setLocation(data.location);
        setPhone(data.phone);
        setOccupation(data.occupation);
        setAboutMe(data.about_me);
        setUserPhoto(data.user_photo);

        if (data.user_photo) {
          setHasPhoto(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MainSection>
          <div className="profile-photos">
            {hasPhoto ? (
              <img src={user_photo} alt="photo" className="user-photo" />
            ) : (
              <img
                src="../icons/user-icon.png"
                alt="photo"
                className="user-photo"
              />
            )}
          </div>

          <div className="title">
            <h3>
              <input
                type="text"
                placeholder={name}
                onChange={(e) => setName(e.target.value)}
              />
            </h3>

            <h3>
              <input
                type="text"
                placeholder={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </h3>

            <button onClick={updateProfile}>Save Profile</button>
          </div>

          <PersonalInfo>
            <div>
              <p>
                <strong>Works Done:</strong>{" "}
              </p>
              <p>
                <strong>Works Done in Time:</strong>{" "}
              </p>
              <p>
                <strong>Works Done Within Budget:</strong>{" "}
              </p>
            </div>
            <div>
              <p>
                <strong>Local:</strong>
                <input
                  type="text"
                  placeholder={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </p>
              <p>
                <strong>Phone:</strong>
                <input
                  type="text"
                  placeholder={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
          </PersonalInfo>

          <AboutMe>
            <h2>About me</h2>
            <input
              type="text"
              placeholder={about_me}
              onChange={(e) => setAboutMe(e.target.value)}
            />
          </AboutMe>

          <Portfolio>
            <h2>Portfolio</h2>
            <div>
              <div className="div-img-portifolio d01"></div>
              <div className="div-img-portifolio d02"></div>
            </div>
          </Portfolio>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
