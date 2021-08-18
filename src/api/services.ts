import api from "./baseURL";

export class Services {
  static async getServices(
    category?: string,
    city?: string,
    state?: string,
    country?: string
  ) {
    try {
      const { data } = await api.get(
        `/api/services?category=${category}&city=${city}&state=${state}&country=${country}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getServiceByID(id: string) {
    try {
      const { data } = await api.get(`/api/services/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getServicesCount() {
    try {
      const { data } = await api.get("/api/services/all/count");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async createService(
    user_id: string,
    title: string,
    category: string,
    description: string,
    price: string,
    city: string,
    state: string,
    country: string,
    token: string
  ): Promise<Boolean> {
    try {
      await api.post(
        "/api/services",
        {
          user_id,
          title,
          category,
          description,
          price,
          city,
          state,
          country,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}