import React, { useState } from "react";

import Link from "next/link";

import authentication from "../services/authentication";
import registerAccount from "../services/registerAccount";

import { Container } from "../styles/components/loginContainer";
import { Div } from "../styles/pages/loginPage";

import { Envelope, Lock, Person } from "react-bootstrap-icons";

import { HeaderDefault } from "../components/HeaderDefault";
import { BodyStyled } from "../styles/components/middleSection";

export default function LoginPage() {
  const [count, setCount] = useState("");

  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const authenticationFailed = () => {
    alert("Falha de autenticação! Verifique as informações preenchidas.");
    //window.location.href = "/login";
    setUsernameLogin("");
    setPasswordLogin("");
  };

  const incompleteFields = () => {
    alert("Favor preencher todos os campos!");
    //window.location.href = "/login";
    setUsernameLogin("");
    setPasswordLogin("");
  };

  const register = async () => {
    try {
      if (usernameReg === "" || emailReg === "" || passwordReg === "") {
        incompleteFields();
        return;
      }
      /*await registerAccount.register({
        usernameReg,
        emailReg,
        passwordReg,
      });*/
      window.location.href = "/login";
    } catch (err) {
      authenticationFailed();
    }
  };

  const login = async () => {
    try {
      /*await authentication.autheticate({
        usernameLogin,
        passwordLogin,
      });*/
      window.location.href = "/home";
    } catch (err) {
      authenticationFailed();
    }
  };

  return (
    <BodyStyled>
      <HeaderDefault />
      <Container>
        <Div>
          {/* this div redirect to register account page */}
          <div className="register-div">
            <span>
              Don't have account, register and make your life better. It's free!
            </span>
            <h2>Find It</h2>
            <Link href="/register">
              <a>                
                Register Now
              </a>
            </Link>
          </div>
          {/* this div is used to login */}
          <div className="form-container-login">
            <div className="image-login">
              <img src={"svg/unlock.svg"} alt="Background" />
            </div>
            <span className="name-label">Login</span>
            <form id="login-form" onSubmit={handleSubmit}>
              <div>
                <Envelope size={25} className="icone" />
                <input
                  type="email"
                  id="login-email"
                  placeholder="Email - ex: you@email.com"
                  defaultValue={usernameLogin}
                  onChange={(e) => {
                    setUsernameLogin(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <Lock size={25} className="icone" />
                <input
                  type="password"
                  id="login-password"
                  placeholder="Password"
                  defaultValue={passwordLogin}
                  onChange={(e) => {
                    setPasswordLogin(e.target.value);
                  }}
                ></input>
              </div>
              <label className="checkbox-label">
                <input type="checkbox"></input>
                remember password?
              </label>

              <button
                type="submit"
                form="login-form"
                value="Submit"
                onClick={login}
              >
                Continue
              </button>
            </form>
            <p>
              Forgot your password? <a href="/">Click here!</a>
            </p>
          </div>
        </Div>
      </Container>
    </BodyStyled>
  );
};