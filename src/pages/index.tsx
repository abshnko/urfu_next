import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import HomePage from "../components/Home/Home";
import Link from "next/link";

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
