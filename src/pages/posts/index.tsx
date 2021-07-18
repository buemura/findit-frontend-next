import api from "../../services/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer, Filters, Feed } from "../../styles/pages/posts";

export function calculateDate(date: any) {
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
        {posts.map((post) => (
          <Feed key={post.id} onClick={() => router.push(`/posts/${post.id}`)}>
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
          </Feed>
        ))}
      </MainContainer>
    </BodyStyled>
  );
}
