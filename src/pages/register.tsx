import React, { useState } from "react";

import Link from "next/link";

import authentication from "../services/authentication";
import registerAccount from "../services/registerAccount";

import { Container } from "../styles/components/registerContainer";
import { Div } from "../styles/pages/registerPage";

import { Envelope, Lock, Person } from "react-bootstrap-icons";

import { HeaderDefault } from "../components/HeaderDefault";
import { BodyStyled } from "../styles/components/middleSection";

export default function Register() {
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
    //window.location.href = "/register";
    setUsernameLogin("");
    setPasswordLogin("");
  };

  const incompleteFields = () => {
    alert("Favor preencher todos os campos!");
    //window.location.href = "/register";
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
          <div className="login-div">
            <span>
              Do you already have an accont? Log-in now!
            </span>
            <Link href="/login">
              <a>
                Login Now
              </a>
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


/*



import background from "../../assets/images/unlock.svg";
import background_register from "../../assets/images/researching.svg";

const MyVar = () => {
  

  return (
    <Container>
      <Div>
        
        
      </Div>
    </Container>
  );
};

export default MyVar;
*/