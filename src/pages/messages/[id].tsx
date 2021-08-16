import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { GetServerSideProps } from "next";
import router from "next/router";
import authentication from "../../services/authentication";
import api from "../../services/api";
import {
  MainContainer,
  UserName,
  MessagesContainer,
  NewMessagesContainer,
} from "../../styles/pages/messages";
import { FormatDate } from "../../utils/formatDate";

interface IMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
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

export default function MessagesDetails({ id }) {
  const [myId, setMyId] = useState<string>("");
  const [state, setState] = useState({
    data: null,
    error: false,
    loading: true,
  });
  const [userID, setUserID] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const token: string = localStorage.getItem("token");
    const authenticatedID: string = authentication.checkUserSession("");
    setMyId(authenticatedID);

    getUserName();

    const intervalId = setInterval(() => {
      setState((state) => ({ data: state.data, error: false, loading: true }));
      api
        .get(`/api/chat/messages/${id}`, {
          headers: {
            authorization: token,
          },
        })
        .then(({ data }) => {
          setMessages(data);
        })
        .then((newData) =>
          setState({ data: newData, error: false, loading: false })
        )
        .catch(function (error) {
          console.log(error);
          setState({ data: null, error: true, loading: false });
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state]);

  function getUserName(): void {
    const token: string = localStorage.getItem("token");

    api
      .get(`/api/chatsById/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        if (data[0].sender_id === myId) {
          setUserID(data[0].receiver_id);
        } else {
          setUserID(data[0].sender_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get(`/api/users/${userID}`)
      .then(({ data }) => {
        setUserName(data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function sendMessage(): void {
    const token: string = localStorage.getItem("token");

    api
      .post(
        `/api/chat/send-message/${id}`,
        {
          sender_id: myId,
          content: newMessage,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        setNewMessage("");
      })
      .catch((err) => {
        setNewMessage("");
        console.log(err);
      });
  }

  function redirectToUserProfile(userId: string): void {
    if (myId === userId) {
      router.push("/profile");
      return;
    }
    router.push(`/profile/${userId}`);
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <UserName onClick={() => redirectToUserProfile(userID)}>
          <img
            src={`${process.env.BACKEND_API}/api/users/${userID}/profile-image`}
            alt={userID}
          />
          <p>{userName}</p>
        </UserName>
        <MessagesContainer>
          {messages.map((message) =>
            myId === message.sender_id ? (
              <div key={message.id} className="iam-sender">
                <p className="message">{message.content}</p>
                <p className="message-date">
                  {FormatDate.calculateDate(message.createdAt)}
                </p>
              </div>
            ) : (
              <div key={message.id} className="iamnot-sender">
                <p className="message">{message.content}</p>
                <p className="message-date">
                  {FormatDate.calculateDate(message.createdAt)}
                </p>
              </div>
            )
          )}
        </MessagesContainer>
        <NewMessagesContainer>
          <input
            className="message-input"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
        </NewMessagesContainer>
      </MainContainer>
    </BodyStyled>
  );
}
