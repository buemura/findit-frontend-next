import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import fetch from "node-fetch";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import authentication from "../../services/authentication";
import api from "../../services/api";
import {
  MainContainer,
  MessagesContainer,
  NewMessagesContainer,
} from "../../styles/pages/messages";

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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState<any>("");

  useEffect(() => {
    const token: string = localStorage.getItem("token");
    const authenticatedID: string = authentication.checkUserSession("");
    setMyId(authenticatedID);

    const intervalId = setInterval(() => {
      setState((state) => ({ data: state.data, error: false, loading: true }));
      api
        .get(`${process.env.BACKEND_API}/api/chat/messages/${id}`, {
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
  }, [useState]);

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
      .then(({ data }) => {
        setNewMessage("");
      })
      .catch((err) => {
        setNewMessage("");
        console.log(err);
      });
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MessagesContainer>
          {messages.map((message) =>
            myId === message.sender_id ? (
              <div key={message.id} className="iam-sender">
                <p className="message">{message.content}</p>
              </div>
            ) : (
              <div key={message.id} className="iamnot-sender">
                <p className="message">{message.content}</p>
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
