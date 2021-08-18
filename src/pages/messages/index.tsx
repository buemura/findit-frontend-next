import router from "next/router";
import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { Chats } from "../../api/chats";
import { Authentication } from "../../api/authentication";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  ChatContainer,
  Title,
} from "../../styles/pages/messages";

interface IUserInfo {
  id: string;
  name: string;
}

interface IChatRooms {
  id: string;
  sender_id: string;
  receiver_id: string;
  createdAt: string;
  updatedAt: string;
  userInfo: IUserInfo;
}

export default function Messages() {
  const [chatRoom, setChatRoom] = useState<Array<IChatRooms>>([]);

  useEffect(() => {
    (async () => {
      const id: string = Authentication.checkUserSession("");
      const token: string = localStorage.getItem("token");

      const data = await Chats.getChatByUserID(id, token);
      setChatRoom(data);
    })();
  }, []);

  async function lastMessage(chatId: string): Promise<string> {
    const token: string = localStorage.getItem("token");
    let message: string = "Last Message";
    message = await Chats.getChatMessages(chatId, token);
    return message;
  }

  function redirectToConversation(chatId: string): void {
    router.push(`/messages/${chatId}`);
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        {chatRoom.length != 0 ? (
          chatRoom.map((chat) => (
            <ChatContainer
              key={chat.id}
              onClick={() => redirectToConversation(chat.id)}
            >
              <img
                src={`${process.env.BACKEND_API}/api/users/${chat.userInfo.id}/profile-image`}
                alt={chat.userInfo.id}
              />
              <div>
                <h2>{chat.userInfo.name}</h2>
                <p>{lastMessage(chat.id)}</p>
              </div>
            </ChatContainer>
          ))
        ) : (
          <Title>
            <h1>You have no message yet...</h1>
          </Title>
        )}
        <div></div>
      </MainContainer>
    </BodyStyled>
  );
}
