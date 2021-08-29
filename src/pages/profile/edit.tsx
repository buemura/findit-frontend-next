import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Authentication } from "../../api/authentication";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  InputText,
  InputTextArea,
  ButtonsStyled,
  SelectStyled,
} from "../../styles/pages/profile-edit";
import countries from "../../utils/countries.json";
import { Users } from "../../api/users";
import { Portfolios } from "../../api/portfolio";

export default function Profile() {
  const router = useRouter();

  const [myId, setMyId] = useState<string>("");
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [about_me, setAboutMe] = useState<string>("");
  const [user_photo, setUserPhoto] = useState<string>("");
  const [portfolios, setPortfolios] = useState([]);

  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState<File>(null);
  const [selectedPortfolioPhoto, setSelectedPortfolioPhoto] =
    useState<File>(null);
  const [hasSelectedCountry, setHasSelectedCountry] = useState<boolean>(false);
  const [mapIndex, setMapIndex] = useState<number>(0);

  const hasNoPhoto = "/icons/user-icon.png";

  const divStyleHasPhoto = {
    backgroundImage: "url(" + user_photo + ")",
  };

  const divStyleHasNoPhoto = {
    backgroundImage: "url(" + hasNoPhoto + ")",
  };

  useEffect(() => {
    (async () => {
      const id: string = Authentication.checkUserSession("");
      setMyId(id);
      setHasPhoto(false);

      const data = await Users.getUserByID(id);
      const portfolioImages = await Portfolios.getUserPortfolios(id);
      setName(data.name);
      setEmail(data.email);
      setCity(data.city);
      setState(data.state);
      setCountry(data.country);
      setPhone(data.phone);
      setOccupation(data.occupation);
      setAboutMe(data.about_me);

      if (portfolioImages.length > 0) {
        setPortfolios(portfolioImages[0].userPortfolios);
      }

      if (data.user_photo) {
        setHasPhoto(true);
        setUserPhoto(
          `${process.env.BACKEND_API}/api/users/${id}/profile-image`
        );
      }
    })();
  }, []);

  // Update profile by sending a PUT request do backend API.
  async function updateProfile(): Promise<void> {
    const id: string = Authentication.checkUserSession("");
    const token: string = localStorage.getItem("token");

    // Update User Photo
    if (selectedProfilePhoto) {
      const profilePhoto = new FormData();
      profilePhoto.append("file", selectedProfilePhoto);

      await Users.updateProfilePhoto(id, profilePhoto, token);
    }

    if (selectedPortfolioPhoto) {
      const portfolioImages = new FormData();
      portfolioImages.append("file", selectedPortfolioPhoto);

      await Portfolios.uploadPortfolioImages(id, portfolioImages, token);
    }

    await Users.updateUser(
      id,
      name,
      email,
      city,
      state,
      country,
      phone,
      occupation,
      about_me,
      token
    );

    router.push("/profile", null, { shallow: false });
  }

  function discardChanges(): void {
    history.back();
  }

  function selectPhoto(elementInputId: string, elementOutputId: string): void {
    var input = document.getElementById(elementInputId) as HTMLInputElement;

    const fileName = document.getElementById(elementOutputId);
    fileName.textContent = input.value.split("\\").reverse()[0];
  }

  function selectPortfolio(
    elementInputId: string,
    elementOutputId: string
  ): void {
    var input = document.getElementById(elementInputId) as HTMLInputElement;

    const fileName = document.getElementById(elementOutputId);
    fileName.textContent = input.value.split("\\").reverse()[0];
  }

  function onChangeSelectCountry(): void {
    const select = document.getElementById(
      "country-select"
    ) as HTMLSelectElement;
    const value = select.options[select.selectedIndex].value;
    const index = select.options[select.selectedIndex].index;

    setCountry(value);
    setHasSelectedCountry(true);
    setMapIndex(index);
  }

  function onChangeSelectState(): void {
    const select = document.getElementById("state-select") as HTMLSelectElement;
    const value = select.options[select.selectedIndex].value;

    setState(value);
  }

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
                      selectPhoto("photo-input", "photo-output");
                      setSelectedProfilePhoto(e.target.files[0]);
                    }}
                  />
                  <span id="photo-output"></span>
                </div>
              </>
            ) : (
              <>
                <div className="user-photo" style={divStyleHasNoPhoto}></div>
                <div className="input-photo-container">
                  <label htmlFor="photo-input">Upload Photo</label>
                  <input
                    type="file"
                    id="photo-input"
                    className="photo-input"
                    onChange={(e) => {
                      selectPhoto("photo-input", "photo-output");
                      setSelectedProfilePhoto(e.target.files[0]);
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
                <SelectStyled
                  id="country-select"
                  onChange={onChangeSelectCountry}
                >
                  {countries.map(({ name }) =>
                    name === country ? (
                      <option key={name.toString()} value={name} selected>
                        {name}
                      </option>
                    ) : (
                      <option key={name.toString()} value={name}>
                        {name}
                      </option>
                    )
                  )}
                </SelectStyled>
              </div>

              <div className="state divisions">
                <span>State</span>
                <SelectStyled
                  id="state-select"
                  default={state}
                  onChange={onChangeSelectState}
                >
                  {hasSelectedCountry ? (
                    countries[mapIndex].states.map(({ name }) =>
                      name === state ? (
                        <option key={name.toString()} value={name} selected>
                          {name}
                        </option>
                      ) : (
                        <option key={name.toString()} value={name}>
                          {name}
                        </option>
                      )
                    )
                  ) : (
                    <option value={state}>{state}</option>
                  )}
                </SelectStyled>
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

            <div className="about-me">
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
              <div className="input-photo-container">
                <label htmlFor="portfolio-input">Upload Portfolio</label>
                <input
                  type="file"
                  id="portfolio-input"
                  className="portfolio-input"
                  onChange={(e) => {
                    selectPortfolio("portfolio-input", "portfolio-output");
                    setSelectedPortfolioPhoto(e.target.files[0]);
                  }}
                />
                <span id="portfolio-output"></span>
              </div>
              <div className="portifolio-container">
                {portfolios.map((portfolio) => (
                  <img
                    key={portfolio._id}
                    className="portfolio-image"
                    src={`${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio._id}`}
                    alt={`${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio._id}`}
                  />
                ))}
              </div>
            </div>

            <div className="buttons  divisions">
              <ButtonsStyled className="discart" onClick={discardChanges}>
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
