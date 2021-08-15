import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import api from "../../services/api";
import authentication from "../../services/authentication";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer } from "../../styles/pages/profile";

export default function Messages() {
  const [chatRoom, setChatRoom] = useState([]);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const id: string = authentication.checkUserSession("");
    const token: string = localStorage.getItem("token");

    api
      .get(`/api/chatsByUser/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        setChatRoom(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <div>
          {chatRoom.map((chat) => (
            <h1>{chat.receiver_id}</h1>
          ))}
        </div>
        <div></div>
      </MainContainer>
    </BodyStyled>
  );
}
