import api from "../../services/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer, Filters, Feed, Title } from "../../styles/pages/posts";
import { FormatDate } from "../../utils/formatDate";

export default function Posts() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    api
      .get(
        `/api/services?category=${category}&city=${city}&state=${state}&country=${country}`
      )
      .then(({ data }) => {
        setPosts(data);
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
            placeholder="City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="State"
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <button onClick={() => setFilter(true)}>Apply Filter</button>
        </Filters>
        {posts.length != 0 ? (
          posts.map((post) => (
            <Feed
              key={post.id}
              onClick={() => router.push(`/posts/${post.id}`)}
            >
              <h2>{post.title}</h2>
              <div>
                <div>
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
                  <p>{FormatDate.calculateDate(post.createdAt)}</p>
                </div>
              </div>
            </Feed>
          ))
        ) : (
          <Title>
            <h1>No service posted yet</h1>
          </Title>
        )}
      </MainContainer>
    </BodyStyled>
  );
}
