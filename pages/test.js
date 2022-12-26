import { useState } from "react";
import { NextPage } from "next";
import { ReactDOM } from "react";
import { BrowserWallet } from "@meshsdk/core";
import Token from "./token";
import Link from "next/link";

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [tokenContent, setTokenContent] = useState([]);
  
  return (
    <div className="app">
        <h1>Hello there</h1>
        <Link href="/">Back to home</Link>
    </div>
  );
};

export default Home;