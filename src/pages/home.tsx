import api from "../services/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  CategoryList,
  MainSection,
  ListItem,
} from "../styles/pages/home";
import authentication from "../services/authentication";

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
  const [usersQuantity, setUsersQuantity] = useState<number>(0);
  const [servicesQuantity, setServicesQuantity] = useState<number>(0);

  useEffect(() => {
    api
      .get("/api/users/all/count")
      .then(({ data }) => {
        setUsersQuantity(data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get("/api/services/all/count")
      .then(({ data }) => {
        setServicesQuantity(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <CategoryList>
          {items.map((i) => (
            <ListItem key={i}>
              <img src={`icons/categories/${i}.png`} alt={i} />
              <p>{i}</p>
            </ListItem>
          ))}
        </CategoryList>
        <MainSection>
          <div className="main-texts">
            <p>Post your project oportunity and interact with freelancers!</p>
            <p>Find the best freelancers in the market now!</p>
          </div>
          <div className="button-information">
            <div className="buttons-container">
              <button
                className="post-services"
                onClick={() => authentication.checkUserSession("create-post")}
              >
                Post Services
              </button>
              <Link href="/posts" passHref>
                <button className="find-services">Find Services</button>
              </Link>
            </div>
            <div className="system-information">
              <p>Freelancers registered: {usersQuantity}</p>
              <p>Projects posted: {servicesQuantity}</p>
            </div>
          </div>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
