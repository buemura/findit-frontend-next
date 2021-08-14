import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import authentication from "../../services/authentication";
import api from "../../services/api";
import { MainContainer } from "../../styles/pages/create-post";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const { id } = params;
  return {
    props: { id },
  };
};

export default function MessagesDetails({ id }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get(`${process.env.BACKEND_API}/api/chat/messages/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        setMessages(data[0].content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(messages);

  function sendMessage() {
    console.log("Message sent");
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <div>
          <p>{messages}</p>
          <input type="text" />
          <button onClick={sendMessage}>Send</button>
        </div>
      </MainContainer>
    </BodyStyled>
  );
}
