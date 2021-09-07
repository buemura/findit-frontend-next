import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer, Filters, Feed, Title } from "../../styles/pages/posts";
import { FormatDate } from "../../utils/formatDate";
import { Services } from "../../api/services";
import { Categories } from "../../api/categories";

export default function Posts() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [filter, setFilter] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await Services.getServices(
        title,
        category,
        city,
        state,
        country
      );
      const allCategories = await Categories.getAllCategories();
      setCategories(allCategories);
      setPosts(data);
      setFilter(false);
    })();
  }, [filter]);

  function formatImageName(category: string): string {
    return category.replace(/ /g, "-").replace("&", "e").toLowerCase();
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <Filters>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
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
              {categories.map((c) =>
                c.category === post.category ? (
                  <div
                    className="category-image"
                    style={{
                      backgroundImage: `url(icons/categories/${formatImageName(
                        c.category
                      )}.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  ></div>
                ) : (
                  <div></div>
                )
              )}
              <div className="category-container">
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
                      {post.user.name}
                    </p>
                  </div>
                  <div>
                    <p>{FormatDate.calculateDate(post.created_at)}</p>
                  </div>
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
