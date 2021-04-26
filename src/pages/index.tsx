import { HeaderDefault } from "../components/HeaderDefault";

import { Div, MiddleSection  } from "../styles/pages/index.module";

import Head from 'next/head';

export default function Home() {
  return (
    <Div className="container">
      <Head>
        <title>Home | Find.it</title>
      </Head>
      <HeaderDefault />
      <MiddleSection>
        <p>Home Page.</p>
      </MiddleSection>
    </Div>
  );
}