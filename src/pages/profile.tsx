import axios from "axios";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../components/HeaderPage";

import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  CoverPhoto,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../styles/pages/profile";

export default function Profile() {
  useEffect(() => {}, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <CoverPhoto>
          <img src="assets/cover-photo.jpg" alt="cover-photo" />
        </CoverPhoto>
        <MainSection>
          <img src="assets/linus.jpg" alt="linus" />
          <div className="title">
            <h1>Linus Torvalds</h1>
            <h3>Developer of LINUX</h3>
          </div>
          <PersonalInfo>
            {/* <h1>Personal Info</h1> */}
            <div>
              <p>Works Done: </p>
              <p>Works Done in Time: </p>
              <p>Works Done Within Budget: </p>
            </div>
            <div>
              <p>Local: </p>
              <p>Phone: +55 (19) 99999-9999</p>
              <p>Email: linus.torvalds@gmail.com</p>
            </div>
          </PersonalInfo>
          <AboutMe>
            <h1>About me</h1>
            <p>
              Linus Torvalds is a Finnish-American software engineer who is the
              creator and, historically, the main developer of the Linux kernel,
              used by Linux distributions and other operating systems such as
              Android. He also created the distributed revision control system
              Git and the scuba dive logging and planning software Subsurface.
            </p>
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
