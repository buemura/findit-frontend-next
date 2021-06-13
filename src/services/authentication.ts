import api from "./api";

const authentication = {
  autheticate: async ({ usernameLogin, passwordLogin }) => {
    return await api.post("/api/login", {
      email: usernameLogin,
      password: passwordLogin,
    });
  },
};

export default authentication;