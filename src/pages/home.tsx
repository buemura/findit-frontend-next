import axios from "axios";
import React, { useState, useEffect } from "react";
import { HeaderDefault } from "../components/HeaderDefault";
import api from "../services/api";

import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  CategoryList,
  MainSection,
  ListItem,
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
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3333/api/services")
      .then((res) => {
        console.log(res.data);
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BodyStyled>
      <HeaderDefault />
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
            <p>Find the best freelancers in the market!</p>
          </div>
          <div className="buttons-container">
            <button className="post-services">Post Services</button>
            <button className="find-services">Find Services</button>
          </div>
          <div className="system-information">
            <p>Freelancers registered: {users.length}</p>
            <p>Projects posted: {services.length}</p>
          </div>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
