import api from "./api";

const registerAccount = {
  register: async ({ usernameReg, emailReg, passwordReg }) => {
    return await api.post("/api/register", {
      name: usernameReg,
      email: emailReg,
      password: passwordReg,
    });
  },
};

export default registerAccount;