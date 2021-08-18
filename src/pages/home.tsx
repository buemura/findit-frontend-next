import api from "../api/baseURL";
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
import { Authentication } from "../api/authentication";
import { Users } from "../api/users";
import { Services } from "../api/services";

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
    (async () => {
      const usersCount = await Users.getUsersCount();
      const servicesCount = await Services.getServicesCount();

      setUsersQuantity(usersCount);
      setServicesQuantity(servicesCount);
    })();
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
                onClick={() => Authentication.checkUserSession("create-post")}
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
