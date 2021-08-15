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

export const MessagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: #ffffff;

  .iam-sender {
    margin: 5px;
    padding-right: 20px;
    text-align: right;
    border-radius: 50px;
    background-color: #2aa9e0;
  }

  .iamnot-sender {
    margin: 5px;
    padding-left: 20px;
    text-align: left;
    border-radius: 50px;
    background-color: #dcdde0;
  }
`;

export const NewMessagesContainer = styled.div`
  width: 100%;
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
