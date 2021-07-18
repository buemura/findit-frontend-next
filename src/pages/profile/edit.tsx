import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  InputText,
  InputTextArea,
  ButtonsStyled
} from "../../styles/pages/profile-edit";

export default function Profile() {
  const router = useRouter();

  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [about_me, setAboutMe] = useState("");
  const [user_photo, setUserPhoto] = useState("");

  /**
   * JWT token is needed in order to make a POST, PUT or DELETE request.
   * Also this token expires in 1 hour. So you will need to Sign in again to generate a new one.
   * The token is associated with the user that Signed in.
   * So if we decode this token we will be able to retrieve user ID and Email.
   */
  let token;
  let tokenDecoded: any;
  let id, exp;

  // Check if the user is logged and the jwt expiration with jwt.exp.
  const checkUserSession = () => {
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
  };

  // Update profile by sending a PUT request do backend API.
  const updateProfile = () => {
    checkUserSession();
    axios
      .put(
        `${process.env.BACKEND_API}/api/users/${id}`,
        {
          name,
          email,
          city,
          state,
          country,
          phone,
          occupation,
          about_me,
          user_photo,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        router.push("/profile");
      })
      .catch((err) => {
        alert("Failed to Update user!");
      });
  };

  useEffect(() => {
    checkUserSession();
    setHasPhoto(false);
    axios
      .get(`${process.env.BACKEND_API}/api/users/${id}`)
      .then(({ data }) => {
        setName(data.name);
        setEmail(data.email);
        setCity(data.city);
        setState(data.state);
        setCountry(data.country);
        setPhone(data.phone);
        setOccupation(data.occupation);
        setAboutMe(data.about_me);
        setUserPhoto(
          `${process.env.BACKEND_API}/api/users/${id}/profile-image`
        );

        if (data.user_photo) {
          setHasPhoto(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const divStyleHasPhoto = {
    backgroundImage: 'url(' + user_photo + ')'
  };
  const hasNotPhoto = "/icons/user-icon.png"
  const divStyleHasNotPhoto = {
    backgroundImage: 'url(' + hasNotPhoto + ')'
  };

  const discartChanges = () => {
    javascript:history.back();
  };

  let portifolioImageList = [
    "https://www.webnaveia.com.br/wp-content/uploads/2019/10/Como-Criar-um-Site-de-Empregos.png",
    "https://lh3.googleusercontent.com/ho4N9JX2-O8IpBfs5lgVnzUagL1AXTpyG3QT-X3pSoOv0u35egobcOGbldO1LQWCrh6K0QN8BEUP8Y4TXTR1IafZBKlmCcervIDE=w960",
    "https://img.ibxk.com.br/2015/06/29/29190710950506.jpg"
  ];

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MainSection>
          {/* image and photo */}
          <div className="profile-photos">
            {hasPhoto ? (
              <div className="user-photo" style={divStyleHasPhoto}>
                <a href="/" className="photo-black-transparence">Click here to <br/>select photo</a>
              </div>
            ) : (
              <div className="user-photo" style={divStyleHasNotPhoto}></div>
            )}
          </div>

          {/* all data to change */}
          <div className="data-container">
            <h2>Basic informations</h2>
            <div className="name-container divisions">
              <span>Name</span>
              <InputText
                type="text"
                placeholder={name}
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div> 

            <div className="phone-container divisions">
              <span>Phone</span>
              <InputText
                type="text"
                placeholder={phone}
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div> 
              
            <div className="email-container divisions">
              <span>E-mail</span>
              <InputText type="text" value={email} disabled/>
            </div>

            <div className="occupation-container divisions">
              <span>Occupation</span>
              <InputText
                type="text"
                placeholder={occupation}
                defaultValue={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>

            <div className="local-container">
              <div className="country divisions">
                <span>Country</span>
                <InputText
                  type="text"
                  placeholder={country}
                  defaultValue={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div className="state divisions">
                <span>State</span>
                <InputText
                  type="text"
                  placeholder={state}
                  defaultValue={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="city divisions">
                <span>City</span>
                <InputText
                  type="text"
                  placeholder={city}
                  defaultValue={city}
                  onChange={(e) => setCity(e.target.value)}
                  />
              </div>            
            </div>

            <div>
              <h2>Resume</h2>
              <InputTextArea
                type="text"
                className="text-area divisions"
                placeholder={about_me}
                defaultValue={about_me}
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </div>
            <div className="portifolio">
              <h2>Portfolio</h2>
              <a href="">Add +</a>
              <div className="portifolio-container">
                {portifolioImageList.map((img) => (
                  <div key={img.toString()}
                    className="portifolio-image" 
                    style={{ backgroundImage: "url("+ img +")" }}>                  
                  </div>
                ))}
              </div>
            </div>
          
            <div className="buttons  divisions">
              <ButtonsStyled className="discart" onClick={discartChanges}>Cancel</ButtonsStyled>
              <ButtonsStyled className="save" onClick={updateProfile}>Save</ButtonsStyled>
            </div>
          </div>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
