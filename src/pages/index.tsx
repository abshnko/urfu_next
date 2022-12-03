import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/Home/Home";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Urfu Next</title>
        <meta name="description" content="Urfu Next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
