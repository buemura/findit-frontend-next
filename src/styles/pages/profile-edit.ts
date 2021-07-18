import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px 0 0 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  background-color: #fff;
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 0;
  width: 100%;

  .profile-photos {
    width: 100%;
    background-image: url("https://img.freepik.com/vetores-gratis/fundo-abstrato-premium-azul-escuro-minimalista-com-elementos-geometricos-escuros-de-luxo_272375-7.jpg?size=626&ext=jpg&ga=GA1.2.1746131912.1617494400");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .user-photo {
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
    margin: 25px;
    transform: translateY(0%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  /* Aparência que terá o seletor de arquivo */
  label {
    background-color: #4169E1;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    padding: 6px 20px
  }

  input[type='file'] {
    display: none;
    background: rgba(0,0,0,.6);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: none;
    color: #eee;
    text-decoration: none;
    font-size: .8rem;
  }

  .input-photo-container {
    display: flex;
    flex-direction: column;
    color: #fff;
  }

  #photo-output {
    font-size: .8rem;
    margin-top: .3rem;
    max-width: 15rem;
  }

  .data-container {
    padding: 40px 0 10px 0;
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  .data-container a {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(10px);
    padding: 1rem;
    text-decoration: none;
    font-size: 0.8rem;

    img {
      width: 0.8rem;
      margin-right: 10px;
    }
  }

  .data-container h1,
  .data-container h3 {
    text-align: left;
    margin: 7px 0;
  }

  .data-container h1 {
    font-size: 2rem;
  }

  .data-container h3 {
    font-size: 1.2rem;
    font-weight: normal;
  }
  
  .portifolio-container {
    display: flex;
    background: #e4e4e4;
    border-radius: 5px;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .portifolio-container .portifolio-image {
    width: 8rem;
    height: 5rem;
    margin: .3rem .5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .divisions {
    display: flex;
    padding: 0 0 .3rem 0;
    height: 2.3rem;

    span {
      width: 5.5rem;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0;
    }
  }
  .local-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .country,
  .state,
  .city {
    width: 100%;
  }
  .country,
  .state {
    margin-right: 2rem;
  }
  .state,
  .city {
    span {
      width: 3rem;
    }
  }

  .portifolio {
    display: flex;
    flex-direction: column;
    position: relative;
    
    a {
      position: absolute;
      right: 0;
      top: 20px;
      height: fit-content;
    }
  }

  .buttons {
    margin: 2rem 0 5rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .save {
    border: 1px #23CF5C solid;
    background: #23CF5C;
    color: #fff;
    &:hover {
      background: #1fb852;
    }
  }
  .discart {
    border: 1px #D43844 solid;
    background: transparent;
    color: #D43844;
    &:hover {
      background: #f0f0f0;
      border: 1px #bf323d solid;
      color: #bf323d;
    }
  }
  
  @media (max-width: 950px) {
    .local-container {
      flex-direction: column;
      width: 100%;
    }
    .country,
    .state {
      margin-right: 0;
    }
    .state,
    .city {
      span {
        width: 5.5rem;
      }
    }
  }
`;

export const InputText = styled.input`
  flex: 1;
  height: 100%;
  border-radius: 5px;
  outline: none;
  background: #eee;
  border: none;
  padding-left: .5rem;
`;

export const InputTextArea = styled.textarea`
  width: 100%;
  min-height: 5rem !important;
  padding: .5rem !important;
  line-break: auto;
  border-radius: 5px;
  outline: none;
  background: #eee;
  border: none;
  resize: vertical;
`;

export const ButtonsStyled = styled.button`
  width: 10rem;
  text-transform: uppercase;
  letter-spacing: .1rem;
  font-weight: bold;
  font-size: .9rem;
  border-radius: 5px;
  outline: none;
  border: none;
  margin: 0 .5rem;
`