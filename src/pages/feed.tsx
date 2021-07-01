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
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.BACKEND_API}/api/services?category=${category}&location=${location}`
      )
      .then(({ data }) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setFilter(false);
  }, [filter]);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <Filters>
          <input
            type="text"
            placeholder="Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <button onClick={() => setFilter(true)}>Apply Filter</button>
        </Filters>
        {posts.map((post) => (
          <Feed key={post.id}>
            <h2>{post.title}</h2>
            <h3>Category: {post.category}</h3>
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
