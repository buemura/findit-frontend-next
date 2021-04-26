import React from "react";

import { HeaderDefault } from "../components/HeaderDefault";

import {
  BodyStyled,
  MiddleSection,
} from "../styles/components/middleSection.module";

export default function Register() {
  return (
    <BodyStyled>
      <HeaderDefault />
      <MiddleSection>
        <p>Register Page.</p>
      </MiddleSection>
    </BodyStyled>
  );
}
