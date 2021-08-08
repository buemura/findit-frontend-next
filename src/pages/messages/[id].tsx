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
  query,
  res,
}) => {
  const { id } = params;
  let { token } = query;
  token = Buffer.from(token, "base64").toString("ascii");

  const url = `${process.env.BACKEND_API}/api/chat/messages/${id}`;
  const result = await fetch(url, {
    headers: {
      "Content-Type": "text/plain",
      "X-My-Custom-Header": "value-v",
      authorization: "Bearer " + token,
    },
  });
  const data = await result.json();

  return {
    props: { data },
  };
};

export default function MessagesDetails({ data }) {
  useEffect(() => {});

  function sendMessage() {
    console.log("Message sent");
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <div>
          <input type="text" />
          <button onClick={sendMessage}>Send</button>
        </div>
      </MainContainer>
    </BodyStyled>
  );
}
