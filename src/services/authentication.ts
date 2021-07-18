import api from "./api";
import router from "next/router";
import jwt_decode from "jwt-decode";

const authentication = {
  register: async ({ name, email, password }) => {
    return await api
      .post("/api/auth/register", {
        name,
        email,
        password,
      })
      .then(({ data }) => {
        return data;
      });
  },
  logIn: async ({ email, password }) => {
    return await api
      .post("/api/auth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        if (data.auth) {
          return data.token;
        }
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  logOut: async () => {
    const token = localStorage.getItem("token");

    try {
      await api.post("/api/auth/logout", {
        token,
      });
      localStorage.removeItem("token");
      router.push("/home");
    } catch (err) {
      alert("Failed to Sign Out!");
    }
  },
  checkUserSession: (page: string) => {
    /**
     * JWT token is needed in order to make a POST, PUT or DELETE request.
     * Also this token expires in 1 hour. So you will need to Sign in again to generate a new one.
     * The token is associated with the user that Signed in.
     * So if we decode this token we will be able to retrieve user ID and Email.
     */

    let token;
    let tokenDecoded: any;
    let id, exp;

    if (localStorage.getItem("token") === null) {
      alert("Your need to sign in to proceed!");
      router.push("/login");
      return;
    }
    token = localStorage.getItem("token");
    tokenDecoded = jwt_decode(token);
    id = tokenDecoded.id;
    exp = tokenDecoded.exp;

    // Check the session expiration with jwt.exp.
    const currentTimestamp = new Date().getTime() / 1000;
    if (exp < currentTimestamp) {
      alert("Your session expired, Sign in again to continue!");
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    if (page) {
      router.push(`/${page}`);
      return id;
    }
    return id;
  },
};

export default authentication;
