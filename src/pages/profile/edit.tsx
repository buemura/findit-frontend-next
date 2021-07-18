import api from "../../services/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import authentication from "../../services/authentication";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  InputText,
  InputTextArea,
  ButtonsStyled,
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

  const [selectedFile, setSelectedFile] = useState(null);

  // Update profile by sending a PUT request do backend API.
  const updateProfile = () => {
    const id: string = authentication.checkUserSession("");
    const token: string = localStorage.getItem("token");

    const data = new FormData();
    data.append("file", selectedFile);

    // Update User Info
    api
      .put(
        `/api/users/${id}`,
        {
          name,
          email,
          city,
          state,
          country,
          phone,
          occupation,
          about_me,
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

    // Update User Photo
    api
      .post(`/api/users/${id}/profile-image/upload`, data, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const id: string = authentication.checkUserSession("");
    setHasPhoto(false);

    api
      .get(`/api/users/${id}`)
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
    backgroundImage: "url(" + user_photo + ")",
  };
  const hasNoPhoto = "/icons/user-icon.png";
  const divStyleHasNotPhoto = {
    backgroundImage: "url(" + hasNoPhoto + ")",
  };

  const discartChanges = () => {
    history.back();
  };

  let portifolioImageList = [
    "https://www.webnaveia.com.br/wp-content/uploads/2019/10/Como-Criar-um-Site-de-Empregos.png",
    "https://lh3.googleusercontent.com/ho4N9JX2-O8IpBfs5lgVnzUagL1AXTpyG3QT-X3pSoOv0u35egobcOGbldO1LQWCrh6K0QN8BEUP8Y4TXTR1IafZBKlmCcervIDE=w960",
    "https://img.ibxk.com.br/2015/06/29/29190710950506.jpg",
  ];

  const selectPhoto = () => {
    const input = document.getElementById("photo-input").value;
    const fileName = document.getElementById("photo-output");

    fileName.textContent = input;
  };

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MainSection>
          {/* image and photo */}
          <div className="profile-photos">
            {hasPhoto ? (
              <>
                <div className="user-photo" style={divStyleHasPhoto}></div>
                <div className="input-photo-container">
                  <label htmlFor="photo-input">Upload Photo</label>
                  <input
                    type="file"
                    id="photo-input"
                    className="photo-input"
                    onChange={(e) => {
                      selectPhoto();
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                  <span id="photo-output"></span>
                </div>
              </>
            ) : (
              <>
                <div className="user-photo" style={divStyleHasNotPhoto}></div>
                <div className="input-photo-container">
                  <label htmlFor="photo-input">Upload Photo</label>
                  <input
                    type="file"
                    id="photo-input"
                    className="photo-input"
                    onChange={(e) => {
                      selectPhoto();
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                  <span id="photo-output"></span>
                </div>
              </>
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
                onChange={(e: { target: { value: string } }) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="occupation-container divisions">
              <span>Occupation</span>
              <InputText
                type="text"
                placeholder={occupation}
                defaultValue={occupation}
                onChange={(e: { target: { value: string } }) =>
                  setOccupation(e.target.value)
                }
              />
            </div>

            <div className="phone-container divisions">
              <span>Phone</span>
              <InputText
                type="text"
                placeholder={phone}
                defaultValue={phone}
                onChange={(e: { target: { value: string } }) =>
                  setPhone(e.target.value)
                }
              />
            </div>

            <div className="email-container divisions">
              <span>E-mail</span>
              <InputText type="text" value={email} disabled />
            </div>

            <div className="local-container">
              <div className="country divisions">
                <span>Country</span>
                <InputText
                  type="text"
                  placeholder={country}
                  defaultValue={country}
                  onChange={(e: { target: { value: string } }) =>
                    setCountry(e.target.value)
                  }
                />
              </div>

              <div className="state divisions">
                <span>State</span>
                <InputText
                  type="text"
                  placeholder={state}
                  defaultValue={state}
                  maxLength={2}
                  onChange={(e: { target: { value: string } }) =>
                    setState(e.target.value.toLocaleUpperCase())
                  }
                />
              </div>

              <div className="city divisions">
                <span>City</span>
                <InputText
                  type="text"
                  placeholder={city}
                  defaultValue={city}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setCity(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h2>About Me</h2>
              <InputTextArea
                type="text"
                className="text-area divisions"
                placeholder={about_me}
                defaultValue={about_me}
                onChange={(e: { target: { value: string } }) =>
                  setAboutMe(e.target.value)
                }
              />
            </div>
            <div className="portifolio">
              <h2>Portfolio</h2>
              <a href="">Add +</a>
              <div className="portifolio-container">
                {portifolioImageList.map((img) => (
                  <div
                    key={img.toString()}
                    className="portifolio-image"
                    style={{ backgroundImage: "url(" + img + ")" }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="buttons  divisions">
              <ButtonsStyled className="discart" onClick={discartChanges}>
                Cancel
              </ButtonsStyled>
              <ButtonsStyled className="save" onClick={updateProfile}>
                Save
              </ButtonsStyled>
            </div>
          </div>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
