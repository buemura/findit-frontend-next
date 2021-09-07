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
import { GetServerSideProps } from "next";
import { Authentication } from "../../api/authentication";
import { useRouter } from "next/router";
import { Users } from "../../api/users";
import { Chats } from "../../api/chats";
import { Portfolios } from "../../api/portfolio";

interface UserType {
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: { id },
  };
};

export default function UsersProfile({ id }) {
  const router = useRouter();
  const [myId, setMyId] = useState<string>("");
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    occupation: "",
    about_me: "",
    user_photo: "",
  });
  const [workdDone, setWorkdDone] = useState(0);
  const [portfolios, setPortfolios] = useState([]);

  const hasNoPhoto = "/icons/user-icon.png";

  const divStyleHasPhoto = {
    backgroundImage: "url(" + profilePhoto + ")",
  };

  const divStyleHasNoPhoto = {
    backgroundImage: "url(" + hasNoPhoto + ")",
  };

  useEffect(() => {
    (async () => {
      const myID = Authentication.checkUserSession("");
      const data = await Users.getUserByID(id);
      const completedServices = await Users.getUserCompletedServices(id);
      const portfolioImages = await Portfolios.getUserPortfolios(id);

      setUser(data);
      setMyId(myID);
      setWorkdDone(completedServices);

      if (myID === id) {
        router.push("/profile");
      }

      if (portfolioImages.length > 0) {
        setPortfolios(portfolioImages[0].userPortfolios);
      }

      if (data.user_photo) {
        setHasPhoto(true);
        setProfilePhoto(
          `${process.env.BACKEND_API}/api/users/${id}/profile-image`
        );
      }
    })();
  }, []);

  function sendMessage(): void {
    const token = localStorage.getItem("token");

    Chats.createChatRoom(myId, id, token);
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
              <h1>{user.name}</h1>
              <h3>{user.occupation}</h3>
              <button onClick={sendMessage}>Send message</button>
            </div>
          </div>
          <PersonalInfo>
            <div>
              <p>
                <strong>Works Done: </strong>
                {workdDone}
              </p>
            </div>
            <div>
              <p>
                <strong>Local:</strong> {user.city}, {user.state} -{" "}
                {user.country}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </PersonalInfo>

          <AboutMe>
            <h2>About me</h2>
            <p>{user.about_me}</p>
          </AboutMe>

          <Portfolio>
            <h2>Portfolio</h2>
            <div>
              {portfolios.map((portfolio) => (
                <img
                  className="portfolio-image"
                  src={`${process.env.BACKEND_API}/api/users/${id}/portfolios-image/${portfolio._id}`}
                  alt={`${process.env.BACKEND_API}/api/users/${id}/portfolios-image/${portfolio._id}`}
                />
              ))}
            </div>
          </Portfolio>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
