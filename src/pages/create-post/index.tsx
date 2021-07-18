import api from "../../services/api";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  ServiceTitle,
  ServiceCategory,
  ServiceDescription,
  ServicePrice,
  ServiceLocation,
} from "../../styles/pages/create-post";
import authentication from "../../services/authentication";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  let id: string;

  const postService = () => {
    const token: string = localStorage.getItem("token");
    id = authentication.checkUserSession("");

    api
      .post(
        "/api/services",
        {
          user_id: id,
          title,
          category,
          description,
          price,
          city,
          state,
          country,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(({ data }) => {
        alert("Your service was posted successfully!");
      })
      .catch((err) => {
        alert(
          "Unable to post service. Check the information and try again later!"
        );
      });
  };

  useEffect(() => {
    id = authentication.checkUserSession("");
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <ServiceTitle>
          <p>Service title*</p>
          <input
            type="text"
            name="title"
            placeholder="Web Site Development"
            onChange={(e) => setTitle(e.target.value)}
          />
        </ServiceTitle>
        <ServiceCategory>
          <p>Category* </p>
          <input
            type="text"
            name="service-category"
            placeholder="Software Development"
            onChange={(e) => setCategory(e.target.value)}
          />
        </ServiceCategory>
        <ServiceDescription>
          <p>Description* </p>
          <input
            type="text"
            name="service-description"
            placeholder="I need a web site development for my company"
            onChange={(e) => setDescription(e.target.value)}
          />
        </ServiceDescription>
        <ServicePrice>
          <p>Price* </p>
          <input
            type="number"
            name="service-price"
            placeholder="R$ 500,00"
            onChange={(e) => setPrice(e.target.value)}
          />
        </ServicePrice>
        <ServiceLocation>
          <p>Location* </p>
          <input
            type="text"
            name="service-city"
            placeholder="Campinas"
            id="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            name="service-state"
            placeholder="SP"
            id="state"
            maxLength={2}
            onChange={(e) => setState(e.target.value.toLocaleUpperCase())}
          />
          <input
            type="text"
            name="service-country"
            placeholder="Brazil"
            id="country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </ServiceLocation>
        <button onClick={postService}>Post Service</button>
      </MainContainer>
    </BodyStyled>
  );
}
