import api from "./baseURL";

export class Comments {
  static async getAllComments(id: string) {
    try {
      const { data } = await api.get(`/api/comments/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async createComment(
    id: string,
    sender_id: string,
    comment: string,
    token: string
  ) {
    try {
      await api.post(
        `/api/comments/post-comment/${id}`,
        {
          sender_id,
          comment,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
