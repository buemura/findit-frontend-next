import axios from "axios";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";
import { MainContainer, Filters, Feed } from "../styles/pages/feed";

interface IPosts {
  id: string;
  title: string;
  price: string;
  location: string;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/services`)
      .then(({ data }) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <Filters>
          <button>Filter</button>
          <button>Apply Filter</button>
        </Filters>
        {posts.map((post) => (
          <Feed key={post.id}>
            <h2>{post.title}</h2>
            <h3>R$ {post.price}</h3>
            <p>{post.location}</p>
            <p>
              <strong>Posted by:</strong> {post.user.name}
            </p>
          </Feed>
        ))}
      </MainContainer>
    </BodyStyled>
  );
}
