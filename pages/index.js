import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Lucid } from "lucid-cardano";
import WalletData from "./walletData";


// first page shown to user
// contains search bar and wallet button
const Index = () => {

  // router object
  const router = useRouter();
  
  return (
    <div className="app">
      <Head>
        <title>Cardano Token Explorer</title>
      </Head>
      <WalletData />
    </div>

  );
}

export default Index;