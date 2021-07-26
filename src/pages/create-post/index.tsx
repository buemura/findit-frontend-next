import api from "../../services/api";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer } from "../../styles/pages/create-post";
import { Modal } from "../../components/modal/modal";

import authentication from "../../services/authentication";
import countries from "../../utils/countries.json";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from 'next/router';

export default function Posts() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPositive, setIsModalPositive] = useState(true);

  const [hasSelectedCountry, setHasSelectedCountry] = useState(false);
  const [mapIndex, setMapIndex] = useState(0);

  const router = useRouter();

  let id: string;

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
        //alert("Your service was posted successfully!"); 
        setIsModalPositive(true);
        setIsModalVisible(true);
      })
      .catch((err) => {
        //alert("Unable to post service. Check the information and try again later!");  
        setIsModalPositive(false);
        setIsModalVisible(true);
      });
  };

  useEffect(() => {
    id = authentication.checkUserSession("");
  }, []);

  const onChangeSelectCountry = () => {
    var select = (document.getElementById("country-select")) as HTMLSelectElement;
    var value = select.options[select.selectedIndex].value;
    var index = select.options[select.selectedIndex].index;

    setCountry(value);
    setHasSelectedCountry(true);
    setMapIndex(index);
  };

  const onChangeSelectState = () => {
    const select = (document.getElementById("state-select")) as HTMLSelectElement;
    const value = select.options[select.selectedIndex].value;

    setState(value);
  };

  return (
    <BodyStyled>
      {isModalVisible ?
        <Modal 
          onClose={() => setIsModalVisible(false)} 
          message={
            (
              isModalPositive ? 
              'Your service was posted successfully!'
              :
              'Unable to post service. Check the information and try again later!'
              )
          }
        ></Modal>
        :
        null
      }
      <HeaderPage />
      <MainContainer>
        <div className="title container">
          <span>Service title*</span>
          <input
            type="text"
            name="title"
            placeholder="Web Site Development"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="category container">
          <span>Category* </span>
          <select name="category" id="select--category">
            {items.map((i) => (
              <option value={i} key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="description container">
          <span>Description* </span>
          <textarea
            name="service-description"
            placeholder="I need a web site development for my company"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="price container">
          <span>Price* </span>
          <input
            type="number"
            name="service-price"
            placeholder="R$ 500,00"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="location container">
          <span>Location* </span>
          <div>
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
          </div>
        </div>
        <div className="buttons  divisions">
          <button className="discart" onClick={() => router.push('/home')}>
            Cancel
          </button>
          <button className="save" onClick={postService}>
            Post Service
          </button>
        </div>
      </MainContainer>
    </BodyStyled>
  );
}
