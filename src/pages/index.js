import { useState} from "react";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Wallet from "./wallet";
import { Blockfrost, Lucid } from "lucid-cardano";
import Header from "./header";

const Home = () => {
  const [address, setAddress] = useState(null);

  const handleAddressUpdate = (newAddress) => {
    setAddress(newAddress);
  }

  return (
    <div className="app">
      <Head>
        <title>Cardano Token Explorer</title>
      </Head>
      <Header updatedAddress={handleAddressUpdate}/>
      <Wallet address = {address}/>
    </div>

  );
}

export default Home;