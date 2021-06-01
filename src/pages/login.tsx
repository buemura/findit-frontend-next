import React from "react";

import { HeaderDefault } from "../components/HeaderDefault";

import { BodyStyled, MiddleSection } from "../styles/components/middleSection";

export default function LoginPage() {
  return (
    <BodyStyled>
      <HeaderDefault />
      <MiddleSection>
        <p>Login Page.....</p>
      </MiddleSection>
    </BodyStyled>
  );
}
