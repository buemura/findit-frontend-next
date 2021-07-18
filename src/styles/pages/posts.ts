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

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 30px 0 0 0;
  button {
    margin: 0 5px 0 5px;
  }
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 30px 0 0 0;
  padding: 10px 20px 10px 20px;
  background-color: #f0f0f0;
  border-radius: 50px;

  div {
    display: flex;
    flex-direction: column;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Post = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 30px 0 0 0;
  padding: 10px 20px 10px 20px;
  background-color: #f0f0f0;
  border-radius: 20px;

  div {
    display: flex;
    flex-direction: column;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 5px 0 0 0;
  padding: 10px 20px 10px 20px;
  background-color: #f0f0f0;
  border-radius: 20px;

  div {
    display: flex;
    flex-direction: column;
  }

  &:hover {
    cursor: pointer;
  }
`;
