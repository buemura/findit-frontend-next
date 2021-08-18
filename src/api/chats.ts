import api from "./baseURL";
import router from "next/router";

export class Chats {
  static async getChatByUserID(id: string, token: string) {
    try {
      const { data } = await api.get(`/api/chatsByUser/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getChatMessages(id: string, token: string) {
    try {
      const { data } = await api.get(`/api/chat/messages/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data[data.length - 1].content;
    } catch (error) {
      console.log(error);
    }
  }

  static async createChatRoom(
    myId: string,
    id: string,
    token: string
  ): Promise<void> {
    try {
      const { data } = await api.post(
        `/api/chat/create-chat`,
        {
          sender_id: myId,
          receiver_id: id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      router.push(`/messages/${data.chat_id}`);
    } catch (error) {
      console.log(error);
    }
  }
}
