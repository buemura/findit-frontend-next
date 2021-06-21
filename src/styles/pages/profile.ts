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

export const CoverPhoto = styled.div`
  width: 100%;
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    margin: 0 60px 0 60px;
  }
`;

export const AboutMe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Portfolio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 10px 0 10px;

    img {
      width: 10%;
      height: 10%;
      margin: 0 5px 0 5px;
      border-radius: 15px;
    }
  }
`;
