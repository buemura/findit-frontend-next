import React from "react";

import { HeaderDefault } from "../components/HeaderDefault";

import { BodyStyled, MiddleSection } from "../styles/components/middleSection.module";

const myVar = () => {
  return (
    <BodyStyled>
      <HeaderDefault />
      <MiddleSection>
        <p>Register Page.</p>        
      </MiddleSection>
    </BodyStyled>
  );
};

export default myVar;