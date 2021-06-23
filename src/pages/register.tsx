import React, { useState } from "react";

import Link from "next/link";

import authentication from "../services/authentication";
import registerAccount from "../services/registerAccount";

import { Container } from "../styles/components/registerContainer";
import { Div } from "../styles/pages/registerPage";

import { Envelope, Lock, Person } from "react-bootstrap-icons";

import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";

import axios from "axios";

export default function Register() {
  const [count, setCount] = useState("");

  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const incompleteFields = () => {
    alert("Favor preencher todos os campos!");
    //window.location.href = "/register";
    setUsernameReg("");
    setEmailReg("");
    setPasswordReg("");
  };

  const register = async () => {
    if (usernameReg === "" || emailReg === "" || passwordReg === "") {
      incompleteFields();
      return;
    }

    try {
      axios
        .post(`http://localhost:4000/api/register`, {
          name: usernameReg,
          email: emailReg,
          password: passwordReg,
        })
        .then((res) => {
          console.log(res.data);
          window.location.href = "/login";
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <BodyStyled>
      <HeaderPage />
      <Container>
        <Div>
          <div className="login-div">
            <span>Do you already have an accont? Log-in now!</span>
            <Link href="/login">
              <a>Login Now</a>
            </Link>
          </div>
          {/* Div for register form */}
          <div className="form-container-register">
            <div className="image-register">
              <img src={"svg/researching.svg"} alt="Background" />
            </div>
            <span className="name-label">Register</span>
            <form id="register-form" onSubmit={handleSubmit}>
              <div>
                <Person size={25} className="icone" />
                <input
                  type="text"
                  id="register-name"
                  placeholder="Full Name"
                  onChange={(e) => {
                    setUsernameReg(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <Envelope size={25} className="icone" />
                <input
                  type="email"
                  id="register-email"
                  placeholder="Email - ex: you@email.com"
                  onChange={(e) => {
                    setEmailReg(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <Lock size={25} className="icone" />
                <input
                  type="password"
                  id="register-password"
                  placeholder="Password"
                ></input>
              </div>
              <div>
                <Lock size={25} className="icone" />
                <input
                  type="password"
                  id="register-password-retry"
                  placeholder="Retry password"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                ></input>
              </div>
              <label className="checkbox-label">
                <input type="checkbox"></input>
                remember password?
              </label>
              <label className="checkbox-label-terms">
                <input type="checkbox"></input>I accept the Terms of Service?
              </label>
              <button
                type="submit"
                form="register-form"
                value="Submit"
                onClick={register}
              >
                Create Account
              </button>
            </form>
          </div>
        </Div>
      </Container>
    </BodyStyled>
  );
}
