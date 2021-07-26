import React from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer } from "../../styles/pages/profile";

export default function Messages() {
  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <h1>User</h1>
        <input type="text" name="text" id="text" />
        <button>Send message</button>
      </MainContainer>
    </BodyStyled>
  );
}
