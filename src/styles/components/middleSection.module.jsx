import styled from 'styled-components';

export const BodyStyled = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }
`;

export const MiddleSection = styled.section`
  width: 70vw;
  min-height: calc(100vh - 60px);
  margin-top: 60px;
  background: #e3e3e3;
  padding: 15px 30px 30px 30px;
`;