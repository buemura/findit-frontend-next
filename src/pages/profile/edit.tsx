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
  SelectStyled
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

    // Update User Photo
    const data = new FormData();
    data.append("file", selectedFile);

    api
      .post(`/api/users/${id}/profile-image/upload`, data, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

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
      .then((res) => {})
      .catch((err) => {
        alert("Failed to Update user!");
      });
    
    router.push("/profile", null, { shallow: false });
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
    var input = document.getElementById("photo-input").value;
    input = input.split("\\").reverse();

    const fileName = document.getElementById("photo-output");

    fileName.textContent = input[0];
  };

  const siglasEstados = ["N/D","AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
  const nomesEstados = ["N/D","Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal","Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins"];
  const nomePaises = ["N/D",'África do Sul','Albânia','Alemanha','Andorra','Angola','Anguilla','Antigua','Arábia Saudita','Argentina','Armênia','Aruba','Austrália','Áustria','Azerbaijão','Bahamas','Bahrein','Bangladesh','Barbados','Bélgica','Benin','Bermudas','Botsuana','Brazil','Brunei','Bulgária','Burkina Fasso','Botão','Cabo Verde','Camarões','Camboja','Canadá','Cazaquistão','Chade','Chile','China','Cidade do Vaticano','Colômbia','Congo','Coréia do Sul','Costa do Marfim','Costa Rica','Croácia','Dinamarca','Djibuti','Dominica','EUA','Egito','El Salvador','Emirados Árabes','Equador','Eritréia','Escócia','Eslováquia','Eslovênia','Espanha','Estônia','Etiópia','Fiji','Filipinas','Finlândia', 'França','Gabão','Gâmbia','Gana','Geórgia','Gibraltar','Granada','Grécia','Guadalupe','Guam','Guatemala','Guiana','Guiana Francesa','Guiné-bissau','Haiti','Holanda','Honduras','Hong Kong','Hungria','Iêmen','Ilhas Cayman','Ilhas Cook','Ilhas Curaçao','Ilhas Marshall','Ilhas Turks & Caicos','Ilhas Virgens (brit.)','Ilhas Virgens(amer.)','Ilhas Wallis e Futuna','Índia','Indonésia','Inglaterra','Irlanda','Islândia','Israel','Itália','Jamaica','Japão','Jordânia', 'Kuwait','Latvia','Líbano','Liechtenstein','Lituânia','Luxemburgo','Macau','Macedônia','Madagascar','Malásia','Malaui','Mali', 'Malta','Marrocos','Martinica','Mauritânia','Mauritius','México','Moldova','Mônaco','Montserrat','Nepal','Nicarágua','Niger','Nigéria', 'Noruega','Nova Caledônia','Nova Zelândia','Omã','Palau','Panamá','Papua-nova Guiné','Paquistão','Peru','Polinésia Francesa','Polônia','Porto Rico','Portugal','Qatar','Quênia','Rep. Dominicana','Rep. Tcheca','Reunion','Romênia','Ruanda','Rússia','Saipan','Samoa Americana','Senegal','Serra Leone','Seychelles','Singapura','Síria','Sri Vincent','Sudão','Suécia','Suiça','Suriname','Tailândia','Taiwan','Tanzânia','Togo','Trinidad Tobago','Tunísia','Turquia','Ucrânia','Uganda','Uruguai','Venezuela','Vietnã','Zaire','Zâmbia','Zimbábue'];
  
  const onChangeSelectCountry = () => {
    var select = document.getElementById('country-select');
  	var value = select.options[select.selectedIndex].value;
	  
    setCountry(value);
  }
  
  const onChangeSelectState = () => {
    var select = document.getElementById('state-select');
  	var value = select.options[select.selectedIndex].value;
	  
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
                <SelectStyled id="country-select" onChange={onChangeSelectCountry}>
                  {nomePaises.map((mapCountry) => ( 
                    mapCountry === country ? (
                      <option
                      key={mapCountry.toString()}
                      value={mapCountry}
                      selected
                      >
                      {mapCountry}
                    </option>  
                    ) : (
                      <option
                        key={mapCountry.toString()}
                        value={mapCountry}
                        >
                        {mapCountry}
                      </option>  
                    ) 
                  ))}
                </SelectStyled>
              </div>

              <div className="state divisions">
                <span>State</span>
                <SelectStyled id="state-select" onChange={onChangeSelectState}>
                  {/* {nomesEstados.map((mapState) => (
                    mapState === state ? (
                      <option
                      key={mapState.toString()}
                      value={mapState}
                      selected
                      >
                      {mapState}
                    </option>  
                    ) : (
                      <option
                        key={mapState.toString()}
                        value={mapState}
                        >
                        {mapState}
                      </option>  
                    ) 
                  ))} */}

                  {siglasEstados.map((mapStateUF) => (
                    mapStateUF === state ? (
                      <option
                      key={mapStateUF.toString()}
                      value={mapStateUF}
                      selected
                      >
                      {mapStateUF}
                    </option>  
                    ) : (
                      <option
                        key={mapStateUF.toString()}
                        value={mapStateUF}
                        >
                        {mapStateUF}
                      </option>  
                    ) 
                  ))}
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
