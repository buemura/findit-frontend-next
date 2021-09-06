import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 60px 0 0 0;
  padding: 0;
  width: 100%;
  min-height: calc(100vh - 60px);
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
    background-image: url("https://www.icolorpalette.com/download/solidcolorimage/28282d_solid_color_background_icolorpalette.png");
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

  .photo-black-transparence {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: none;

    a {
      color: #eee;
      text-decoration: none;
      font-size: 0.8rem;
    }
  }
  .user-photo:hover .photo-black-transparence {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    padding: 40px 0 10px 0;
    color: #eee;
  }

  .title a {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(10px);
    padding: 1rem;
    text-decoration: none;
    color: #eee;
    font-size: 0.8rem;

    img {
      width: 0.8rem;
      margin-right: 10px;
    }
  }

  .title h1,
  .title h3 {
    text-align: left;
    margin: 7px 0;
  }

  .title h1 {
    font-size: 2rem;
  }

  .title h3 {
    font-size: 1.2rem;
    font-weight: normal;
  }
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  border-bottom: 1px solid #aaa;
  div {
    margin: 0 10px 0 10px;
  }
`;

export const AboutMe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-bottom: 1px solid #aaa;
  h2,
  p {
    margin: 15px;
  }
  input {
    width: 80%;
    height: 100px;
  }
`;

export const Portfolio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-bottom: 1px solid #aaa;
  padding-bottom: 20px;
  margin-bottom: 30px;
  h2 {
    margin: 15px;
  }
  div {
    display: flex;
    .portfolio-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 10px 0 10px;
      position: relative;
      display: flex;
      flex-direction: column;

      .div-img-portifolio {
        height: 80px;
        width: 80px;
        background-position: center;
        background-size: cover;
      }

      .div-img-portifolio.d01 {
        background-image: url("assets/linux.jpg");
      }
      .div-img-portifolio.d02 {
        background-image: url("assets/unix.jpg");
      }

      .image-description {
        display: none;
        transition: .2s;
        position: absolute;
        text-align: center;
        background: #232329;
        transform: scale(.1);
        padding: 1rem;
        margin: 0;
        color: #fff;
        border-radius: 5px;
      }

      .portfolio-image {
        height: 8rem;
        width: 8rem;
        border-radius: 10px;
        margin: 5px;
        transition: 0.2s;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        &:hover {
          transform: scale(1.05);
          cursor: pointer;
        }
      }

      &:hover .image-description {
        display: flex;
        animation-name: anm1;
        animation-duration: .6s;
        animation-iteration-count: ease-out;
        transform: scale(1) translateY(125%);
      }

      @keyframes anm1 {
        0% {
        transform: scale(0) translateY(0%);
        }
        100% {
        transform: scale(1) translateY(125%);
        }
      }
    }  
  }
`;
