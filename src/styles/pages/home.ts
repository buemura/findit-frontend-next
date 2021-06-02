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
  height: 100%;
  background-color: #efefef;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px 0 15px;
  width: 90px;
  word-wrap: break-word;
  list-style: none;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  p {
    text-align: center;
  }
`;

export const MainSection = styled.div`
  width: 70vw;
  min-height: calc(100vh - 60px);
  background: #e3e3e3;
  padding: 15px 30px 30px 30px;
`;

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-right: 5px;
  height: 30px;
  box-sizing: border-box;
  button {
    height: 100%;
    border: transparent;
    border-radius: 0 15px 15px 0;
    padding: 0 15px;
    transition: 0.2s;
    background: #f7226a;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    box-sizing: border-box;
    &:hover {
      background: #ad3860;
    }
  }
  input {
    height: 100%;
    width: 300px;
    border-radius: 15px 0 0 15px;
    outline: none;
    border: transparent;
    padding-left: 40px;
    box-sizing: border-box;
  }
  img {
    width: 20px;
    position: absolute;
    left: 10px;
  }
`;
