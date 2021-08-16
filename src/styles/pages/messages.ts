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

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 70%;
  margin: 1px 0 0 0;
  padding: 5px 20px 5px 20px;
  background-color: #ffffff;

  &:hover {
    cursor: pointer;
  }

  img {
    margin: 0 40px 0 0;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 1px 0 10px 0;
  padding: 0px 5px 0px 5px;
  background-color: #ffffff;

  font-size: x-large;

  img {
    margin: 0 10px 0 0;
    border-radius: 50%;

    width: 50px;
    height: 50px;
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

export const MessagesContainer = styled.div`
  width: 60%;
  float: right;

  background-color: #ffffff;

  div {
    margin: 5px;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 20px;
    width: 50%;
  }

  .iam-sender {
    text-align: right;
    float: right;
    background-color: #2e384d;
    color: #ffffff;
  }

  .iamnot-sender {
    text-align: left;
    float: left;
    background-color: #dcdde0;
  }

  .message {
  }

  .message-date {
    font-size: x-small;
  }
`;

export const NewMessagesContainer = styled.div`
  width: 60%;
  margin: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;

  .message-input {
    width: 90%;
    height: 30px;
    border-radius: 10px;
  }

  .send-button {
    width: 10%;
    height: 30px;
    border-radius: 10px;
    border: none;
    background-color: #5965e0;
    color: #ffffff;

    &:hover {
      cursor: pointer;
    }
  }
`;
