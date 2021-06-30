import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../../styles/pages/profile";

interface IUser {
  name: string;
  email: string;
  location: string;
  phone: string;
  occupation: string;
  about_me: string;
  user_photo: string;
}

export default function Profile() {
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [about_me, setAboutMe] = useState("");
  const [user_photo, setUserPhoto] = useState("");

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    location: "",
    phone: "",
    occupation: "",
    about_me: "",
    user_photo: "",
  });

  const userId1 = "65c22e8a-344a-4271-a80e-31a9097b8a79";
  const userId2 = "7c6c9436-e6eb-s46d4-a6e6-eea3c9d361ff";
  const userId3 = "c2eec2fe-473a-40ee-9efe-25089494bd13";
  const userId4 = "5137ac13-e981-4f23-8131-b22de01f0c99";
  // Token is needed in order to make a PUT request.
  // Also this token expires in 1 hour. Sign in again to generate a new one.
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxMzdhYzEzLWU5ODEtNGYyMy04MTMxLWIyMmRlMDFmMGM5OSIsImVtYWlsIjoibGludXMudG9ydmFsZHNAZ21haWwuY29tIiwiaWF0IjoxNjI1MDI1MTkwLCJleHAiOjE2MjUwMjg3OTB9.cKlM4qkFOS2rE7rpQu6Z7Y_XTFnI7iXoQMrmtDlVW0I";

  const updateProfile = () => {
    console.log({
      name,
      email,
      location,
      phone,
      occupation,
      about_me,
      user_photo,
    });

    try {
      axios
        .put(
          `http://localhost:4000/api/users/${userId3}`,
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
          window.location.href = "/profile";
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setHasPhoto(false);
    axios
      .get(`http://localhost:4000/api/users/${userId3}`)
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
