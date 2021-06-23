import axios from "axios";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../components/HeaderPage";

import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../styles/pages/profile";

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
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    location: "",
    phone: "",
    occupation: "",
    about_me: "",
    user_photo: "",
  });

  //
  const userId = "2eea1831-ac4f-4e87-b1fb-1aee22a8b8e2";
  const userId2 = "20f1f28a-bf61-4705-abc8-c10e7d44ec36";

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/users/${userId}`)
      .then(({ data }) => {
        setUser(data);
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
          <img src={user.user_photo} alt="linus" />
          <div className="title">
            <h1>{user.name}</h1>
            <h3>{user.occupation}</h3>
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
            <h1>About me</h1>
            <p>{user.about_me}</p>
          </AboutMe>
          <Portfolio>
            <h1>Portfolio</h1>
            <div>
              <img src="assets/linux.jpg" alt="linux" />
              <img src="assets/unix.jpg" alt="unix" />
            </div>
          </Portfolio>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
