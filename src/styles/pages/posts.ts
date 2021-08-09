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
  background-color: #f0f0f0;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 20px 0;

  input {
    margin: .1rem 0;
    padding: 0 0 0 .8rem;
    width: 100%;

    border: 0.2px solid #b8b8b8;
    border-radius: 5px;

    height: 30px;

    &:focus {
      border: 1px solid #4169e1;
    }
  }


  button {
    margin: .8rem 0;
    background-color: #4169e1;
    color: #ffffff;

    border: none;
    border-radius: 5px;

    height: 30px;
    min-width: 100px;

    &:hover {
      cursor: pointer;
      background-color: #a1d5ff;
      color: #000000;
    }
  }

  @media (max-width: 1020px) {
    width: 95%;
    
    input {
      width: 95%;
    }
  }

  @media (max-width: 650px) {
    margin-top: calc(60px + 20px);
    flex-direction: column;
    width: 95%;
  }
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 70%;
  margin: .3rem 0 0 0;
  padding: .6rem 2rem;
  background-color: #ffffff;
  border-radius: 3px;

  h2 {
    font-size: 1.8rem;
    margin: .8rem 0;
  }

  div {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    width: 100%;

    * {
      margin: 0;
      padding: 0;
    }

    div {
      display: flex;
      flex-direction: column;
    }

    p, h3 {
      margin: .3rem 0;
    }
  }

  div:last-child {
    align-items: flex-end;
  }

  &:hover {
    cursor: pointer;
    background: #f8f8f8;
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;

export const Post = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 70%;
  margin: 30px 0 0 0;
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;

  div {
    * {
      margin: 0;
      padding: 0;
    }

    h2 {
      font-size: 1.8rem;
      margin: 1rem 0;
    }

    p, h3 {
      margin: .3rem 0;
    }
  }

  &:hover {
    cursor: default;
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 200px 0 0 0;
`;

export const PostComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  margin: 15px 0 15px 0;
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;
  font-size: large;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    input {
      margin: 10px 0 10px 0;

      border: 0.2px solid #b8b8b8;
      border-radius: 5px;

      height: 30px;
      width: 80%;

      &:focus {
        border: 1px solid #4169e1;
      }
    }

    &:hover {
      cursor: pointer;
    }

    button {
      margin: 0 0 0 10px;
      background-color: #4169e1;
      color: #ffffff;

      border: none;
      border-radius: 5px;

      height: 30px;
      flex: 1;

      &:hover {
        cursor: pointer;
        background-color: #0300a3;
        color: #ffffff;
      }
    }
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 70%;
  margin: 1px 0 0 0;
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;

  img {
    margin: 0 40px 0 0;
    border-radius: 30%;

    width: 70px;
    height: 70px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;
