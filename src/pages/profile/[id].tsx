import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../../styles/pages/profile";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import Link from "next/link";
import authentication from "../../services/authentication";
import { useRouter } from "next/router";
import api from "../../services/api";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const url = `${process.env.BACKEND_API}/api/users/${id}`;
  const result = await fetch(url);
  const data = await result.json();

  return {
    props: { data },
  };
};

export default function UsersProfile({ data }) {
  const router = useRouter();
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const hasNoPhoto = "/icons/user-icon.png";

  const divStyleHasPhoto = {
    backgroundImage: "url(" + profilePhoto + ")",
  };

  const divStyleHasNoPhoto = {
    backgroundImage: "url(" + hasNoPhoto + ")",
  };

  useEffect(() => {
    const myId = authentication.checkUserSession("");

    if (myId === data.id) {
      router.push("/profile");
    }

    if (data.user_photo) {
      setHasPhoto(true);
      setProfilePhoto(
        `${process.env.BACKEND_API}/api/users/${data.id}/profile-image`
      );
    }
  }, []);

  function sendMessage(): void {
    const myId = authentication.checkUserSession("");
    let token = localStorage.getItem("token");

    console.log(`myID: ${myId}`);
    console.log(`token: ${token}`);

    api
      .post(
        `/api/chat/create-chat`,
        {
          sender_id: myId,
          receiver_id: data.id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(({ data }) => {
        token = btoa(token);
        router.push({
          pathname: `/messages/${data.chat_id}`,
          query: { token },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MainSection>
          <div className="profile-photos">
            {hasPhoto ? (
              <div className="user-photo" style={divStyleHasPhoto}></div>
            ) : (
              <div className="user-photo" style={divStyleHasNoPhoto}></div>
            )}
            <div className="title">
              <h1>{data.name}</h1>
              <h3>{data.occupation}</h3>
              <button onClick={sendMessage}>Send message</button>
            </div>
          </div>
          <PersonalInfo>
            <div>
              <p>
                <strong>Works Done:</strong>{" "}
              </p>
              <p>
                <strong>Works Done in Time:</strong>{" "}
              </p>
              <p>
                <strong>Works Done Within Budget:</strong>{" "}
              </p>
            </div>
            <div>
              <p>
                <strong>Local:</strong> {data.city}, {data.state} -{" "}
                {data.country}
              </p>
              <p>
                <strong>Phone:</strong> {data.phone}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
            </div>
          </PersonalInfo>

          <AboutMe>
            <h2>About me</h2>
            <p>{data.about_me}</p>
          </AboutMe>

          <Portfolio>
            <h2>Portfolio</h2>
            <div>
              <div className="div-img-portifolio d01"></div>
              <div className="div-img-portifolio d02"></div>
            </div>
          </Portfolio>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
