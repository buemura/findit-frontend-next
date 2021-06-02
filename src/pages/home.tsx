import React from "react";

import { HeaderDefault } from "../components/HeaderDefault";

import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  CategoryList,
  MainSection,
  ListItem,
  SearchBox,
} from "../styles/pages/home";

export default function HomePage() {
  const items = [
    "Assistência Técnica",
    "Aulas",
    "Autos",
    "Consultoria",
    "Design e Tenologia",
    "Eventos",
    "Moda e Beleza",
    "Reformas",
    "Saúde",
    "Serviços Domésticos",
  ];

  return (
    <BodyStyled>
      <HeaderDefault />
      <MainContainer>
        <CategoryList>
          {items.map((i) => (
            <ListItem>
              <p>{i}</p>
            </ListItem>
          ))}
        </CategoryList>
        <MainSection>
          <div>
            <h1>Find freelance services is easy.</h1>
            <h2>
              Enter the service category that you stand out and find your future
              employer.
            </h2>
            <SearchBox>
              <img src="icons/search.png" alt="Search" />
              <input type="text" placeholder="Type here..." />
              <button>Search</button>
            </SearchBox>
          </div>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
