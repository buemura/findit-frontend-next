import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer, Post } from "../../styles/pages/posts";

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.BACKEND_API}/api/services/`);
  const data = await res.json();

  const paths = data.map((post) => {
    return {
      params: { id: post.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`${process.env.BACKEND_API}/api/services/${id}`);
  const data = await res.json();

  return {
    props: { post: data },
  };
};

export function calculateDate(date) {
  const dateTimestamp = Date.parse(date);
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const postedDate = new Date(dateTimestamp).getDate();
  const postedMonth = new Date(dateTimestamp).getMonth();
  const postedYear = new Date(dateTimestamp).getFullYear();

  if (postedDate === currentDate && postedMonth === currentMonth) {
    return `Today`;
  }

  if (postedDate < currentDate && postedMonth === currentMonth) {
    return `${currentDate - postedDate} days ago`;
  }

  if (currentMonth - postedMonth >= 3) {
    return `${postedDate}/${postedMonth}/${postedYear}`;
  }

  if (postedMonth < currentMonth) {
    return `${currentMonth - postedMonth} month ago`;
  }

  return "";
}

export default function PostDetails({ post }) {
  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <Post>
          <div>
            <h2>{post.title}</h2>
            <h3>Category: {post.category}</h3>
            <p>
              {post.city}, {post.state} - {post.country}
            </p>
          </div>
          <div>
            <h3>R$ {post.price}</h3>
            <p>
              <strong>Posted by: </strong>
              {post.User.name}
            </p>
          </div>
          <div>
            <p>{calculateDate(post.createdAt)}</p>
          </div>
        </Post>
      </MainContainer>
    </BodyStyled>
  );
}
