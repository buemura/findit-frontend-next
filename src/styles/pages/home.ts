import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 60px;
  padding: 15px 0 15px 0;
  width: 100%;
  background-color: #fff;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 15px 0px 15px;
  width: 100px;
  transition: 0.15s;

  word-wrap: break-word;
  list-style: none;
  color: #000;
  border-radius: 10px;
  p {
    text-align: center;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.08);
  }
`;

export const MainSection = styled.div`
  width: 70vw;
  min-height: calc(100vh - 60px);
  background: #fff;
  padding: 15px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 50px;

  .main-texts p {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 2em;
    font-style: bold;
  }

  .buttons-container button {
    width: 250px;
    height: 60px;
    border: 0;
    border-radius: 5px;
    margin: 30px 30px 0px 30px;
    font-size: large;
    transition: 0.15s;

    &:hover {
      cursor: pointer;
    }
  }

  .post-services {
    background-color: #41b9e1;
    color: #fff;
    &:hover {
      transform: scale(1.02);
      background-color: #4169e1;
    }
  }

  .find-services {
    background: transparent;
    border: 3px solid #41b9e1 !important;
    color: #41b9e1;

    &:hover {
      transform: scale(1.02);
      border: 3px solid #4169e1 !important;
      color: #4169e1;
    }
  }

  .system-information {
    display: flex;
    flex-direction: row;
    p {
      margin: 40px 15px 0px 15px;
    }
  }
`;
