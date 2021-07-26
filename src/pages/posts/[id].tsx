import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { Comments, MainContainer, Post } from "../../styles/pages/posts";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import { calculateDate } from "../../utils/calculateDate";
import { useRouter } from "next/router";
import authentication from "../../services/authentication";
import api from "../../services/api";

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
  const router = useRouter();
  const serviceId = data.id;

  const [comment, setComment] = useState<string>("");
  const [myId, setMyId] = useState<string>("");
  const [postedComments, setPostedComments] = useState([]);

  useEffect(() => {
    setMyId(authentication.checkUserSession(""));
    api
      .get(`/api/comments/${serviceId}`)
      .then(({ data }) => {
        setPostedComments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function postComment(): void {
    const token: string = localStorage.getItem("token");

    api.post(
      `/api/comments/post-comment/${serviceId}`,
      {
        sender_id: myId,
        comment,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  }

  function redirectToUserProfile(userId: string): void {
    if (myId === userId) {
      router.push("/profile");
      return;
    }
    router.push(`/profile/${userId}`);
    return;
  }

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
              <strong
                onClick={() => {
                  redirectToUserProfile(data.User.id);
                }}
              >
                Posted by:{" "}
              </strong>
              {data.User.name}
            </p>
          </div>
          <div>
            <p>{calculateDate(data.createdAt)}</p>
          </div>
        </Post>
        <Comments>
          <input
            type="text"
            name="text"
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={postComment}>Comment</button>
        </Comments>
        <Comments>
          {postedComments.map((com) => (
            <div
              key={com.id}
              onClick={() => redirectToUserProfile(com.User.id)}
            >
              <div>
                <img
                  src={`${process.env.BACKEND_API}/api/users/${com.User.id}/profile-image`}
                  alt=""
                />
                <h2>{com.User.name}</h2>
                <p>{com.comment}</p>
              </div>
            </div>
          ))}
        </Comments>
      </MainContainer>
    </BodyStyled>
  );
}
