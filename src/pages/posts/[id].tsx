import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { Comments, MainContainer, Post } from "../../styles/pages/posts";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import { calculateDate } from "../../utils/calculateDate";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const { id } = params;
  const url = `${process.env.BACKEND_API}/api/services/${id}`;
  const result = await fetch(url);
  const data = await result.json();

  return {
    props: { data },
  };
};

export default function PostDetails({ data }) {
  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <Post>
          <div>
            <h2>{data.title}</h2>
            <h3>Category: {data.category}</h3>
            <p>
              {data.city}, {data.state} - {data.country}
            </p>
          </div>
          <div>
            <h3>R$ {data.price}</h3>
            <p>
              <strong>Posted by: </strong>
              {data.User.name}
            </p>
          </div>
          <div>
            <p>{calculateDate(data.createdAt)}</p>
          </div>
        </Post>
        <Comments>
          <div>
            <h3>Linus Torvalds</h3>
            <p>
              Hello, I have the required experience for the project. I can
              finish the job in 5 days for 300 total price.
            </p>
          </div>
          <div>
            <h3>Bill Gates</h3>
            <p>
              Hello, I have the required experience for the project. I can
              finish the job in 6 days for 200 total price.
            </p>
          </div>
          <div>
            <h3>Alan Turing</h3>
            <p>
              Hello, I have the required experience for the project. I can
              finish the job in 2 days for 500 total price.
            </p>
          </div>
        </Comments>
      </MainContainer>
    </BodyStyled>
  );
}
