import { HeaderDefault } from "../components/HeaderDefault"
import styled from 'styled-components';

import Head from 'next/head';

export default function Home() {
  return (
    <Div className="container">
      <Head>
        <title>Home | Find.it</title>
      </Head>
      <HeaderDefault />
    </Div>
  );
}

const Div = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
  * {
    font-family: 'Roboto', sans-serif;
  }
`;