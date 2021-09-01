import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  CommentsContainer,
  MainContainer,
  Post,
  PostComments,
} from "../../styles/pages/posts";
import { GetServerSideProps } from "next";
import { FormatDate } from "../../utils/formatDate";
import { useRouter } from "next/router";
import { Authentication } from "../../api/authentication";
import { Comments } from "../../api/comments";
import { Services } from "../../api/services";
import { url } from "inspector";

interface UserType {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  occupation: string;
  about_me: string;
  user_photo: string;
}

interface ServiceType {
  id: string;
  user_id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  city: string;
  state: string;
  country: string;
  createdAt: string;
  User?: UserType;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const { id } = params;
  return {
    props: { id },
  };
};

export default function PostDetails({ id }) {
  const router = useRouter();

  const [post, setPost] = useState({
    id: "",
    user_id: "",
    title: "",
    category: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: "",
    createdAt: "",
    User: {
      id: "",
      name: "",
      email: "",
      user_photo: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      occupation: "",
      about_me: "",
      email_verified: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
    },
  });
  const [comment, setComment] = useState<string>("");
  const [postedComments, setPostedComments] = useState([]);

  useEffect(() => {
    (async () => {
      const postData = await Services.getServiceByID(id);
      const commentsData = await Comments.getAllComments(id);
      setPost(postData);
      setPostedComments(commentsData);
    })();
  }, []);

  async function postComment(): Promise<void> {
    const myId = Authentication.checkUserSession("");
    const token: string = localStorage.getItem("token");

    if (myId === post.user_id) {
      alert("You cannot post a comment on your own service!");
      return;
    }

    if (comment === "") {
      alert("Comment is empty, please check");
      return;
    }

    await Comments.createComment(id, myId, comment, token);
    window.location.reload();
  }

  function redirectToUserProfile(userId: string): void {
    const myId = Authentication.checkUserSession("");

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
            <h2>{post.title}</h2>
            <h3>Category: {post.category}</h3>
            <p>{post.description}</p>
            <p>
              {post.city}, {post.state} - {post.country}
            </p>
          </div>
          <div>
            <h3>R$ {post.price}</h3>
            <p>
              <strong
                onClick={() => {
                  redirectToUserProfile(post.User.id);
                }}
              >
                Posted by:{" "}
              </strong>
              {post.User.name}
            </p>
          </div>
          <div>
            <p>{FormatDate.calculateDate(post.createdAt)}</p>
          </div>
        </Post>
        <PostComments>
          <label>Post a comment</label>
          <div>
            <input
              type="text"
              name="text"
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={postComment}>Comment</button>
          </div>
        </PostComments>
        {postedComments.map((com) => (
          <CommentsContainer
            key={com.id}
            onClick={() => redirectToUserProfile(com.User.id)}
          >
            {/* <img
              src={`${process.env.BACKEND_API}/api/users/${com.User.id}/profile-image`}
              alt=""
            /> */}
            <div
              className="image"
              style={{
                backgroundImage:
                  "url(" +
                  `${process.env.BACKEND_API}/api/users/${com.User.id}/profile-image` +
                  ")",
              }}
            ></div>
            <div className="container--values">
              <div className="data">
                <h3>{com.User.name}</h3>
                <p>{com.comment}</p>
              </div>
              <div className="date">
                <p>{FormatDate.calculateDate(com.createdAt)}</p>
              </div>
            </div>
          </CommentsContainer>
        ))}
      </MainContainer>
    </BodyStyled>
  );
}
