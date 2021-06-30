import axios from "axios";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
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
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    location: "",
    phone: "",
    occupation: "",
    about_me: "",
    user_photo: "",
  });

  /**
   * Token is needed in order to make a POST, PUT or DELETE request.
   * Also this token expires in 1 hour. Sign in again to generate a new one.
   * The token is associated with the user. So if we decode this token, we will be able to retrieve user ID and Email.
   */
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIyZThhLTM0NGEtNDI3MS1hODBlLTMxYTkwOTdiOGE3OSIsImVtYWlsIjoiYnJ1bm8udWVtdXJhQGdtYWlsLmNvbSIsImlhdCI6MTYyNTAyNzI1MiwiZXhwIjoxNjI1MDMwODUyfQ.yI2IOKP1UTbFobWptp0v5QQq5OCC6riuiN7CVb0eduA";
  const tokenDecoded: any = jwt_decode(token);
  const { id, email, exp } = tokenDecoded;

  useEffect(() => {
    setHasPhoto(false);
    axios
      .get(`http://localhost:4000/api/users/${id}`)
      .then(({ data }) => {
        setUser(data);

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
              <img src={user.user_photo} alt="photo" className="user-photo" />
            ) : (
              <img
                src="icons/user-icon.png"
                alt="photo"
                className="user-photo"
              />
            )}
          </div>

          <div className="title">
            <h1>{user.name}</h1>
            <h3>{user.occupation}</h3>
            <Link href="/profile/edit">
              <a href="">
                <img src="icons/edit-property-64.png"></img>Edit Profile
              </a>
            </Link>
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
                <strong>Local:</strong> {user.location}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </PersonalInfo>

          <AboutMe>
            <h2>About me</h2>
            <p>{user.about_me}</p>
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
