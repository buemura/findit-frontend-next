import api from "./baseURL";

export class Portfolios {
  static async getUserPortfolios(id: string) {
    try {
      const { data } = await api.get(`/api/users/${id}/portfolios`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async uploadPortfolioImages(
    id: string,
    files: Array<FormData>,
    token: string
  ) {
    try {
      await api.post(`/api/users/${id}/portfolios/upload`, files, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
