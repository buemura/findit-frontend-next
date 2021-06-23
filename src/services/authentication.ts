import api from "./api";

const authentication = {
  autheticate: async ({ usernameLogin, passwordLogin }) => {
    return await api.post("/login", {
      email: usernameLogin,
      password: passwordLogin,
    });
  },
};

export default authentication;