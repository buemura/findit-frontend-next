import axios from "axios";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  ServiceTitle,
  ServiceImage,
  ServiceCategory,
  ServiceDescription,
  ServicePrice,
  ServiceLocation,
} from "../styles/pages/posts";

interface IPosts {
  name: string;
  email: string;
  location: string;
  phone: string;
  occupation: string;
  about_me: string;
  user_photo: string;
}

export default function Posts() {
  const [user, setUser] = useState<IPosts>({
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
        <ServiceTitle>
          <p>Service title*</p>
          <input type="text" name="title" placeholder="Web Site Development" />
        </ServiceTitle>
        <ServiceImage>
          <p>Service images </p>
          <button>Add +</button>
        </ServiceImage>
        <ServiceCategory>
          <p>Category* </p>
          <input
            type="text"
            name="service-category"
            placeholder="Software Development"
          />
        </ServiceCategory>
        <ServiceDescription>
          <p>Description* </p>
          <input
            type="text"
            name="service-description"
            placeholder="I need a web site development for my company"
          />
        </ServiceDescription>
        <ServicePrice>
          <p>Price* </p>
          <input type="number" name="service-price" placeholder="R$ 500,00" />
        </ServicePrice>
        <ServiceLocation>
          <p>Location* </p>
          <input
            type="text"
            name="service-city"
            placeholder="Campinas"
            id="city"
          />
          <input type="text" name="service-state" placeholder="SP" id="state" />
        </ServiceLocation>
      </MainContainer>
    </BodyStyled>
  );
}
