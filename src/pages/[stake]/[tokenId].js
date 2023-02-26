import { useRouter } from "next/router";
import { useState } from "react";
import Prices from "../prices";
import SearchBar from "../searchbar";
import TokenData from "../tokenData";
import WalletButton from "../walletButton";


function TokenPage() {

    const router = useRouter();
    const { stake, tokenId } = router.query;


    return (
      <div>
      <header>
        <label className="main-label">✥ Explorer</label>
        <SearchBar />
        <WalletButton stake = {stake}/>
      </header>
        <TokenData tokenId = {tokenId} stake = {stake}/>
      </div>
    );
  }

export async function getStaticPaths() {
    // This function creates the dynamic paths for the page.
    // In this case, we have a list of all possible numbers between 1 and 5 that we can use to create the paths
    
    return {
      paths: [],
      fallback: true
    };
}

export async function getStaticProps({ params }) {
    // This function fetches the data for the page.
    // In this case, we don't need to fetch any data because the number is already available in the params object.
    const tokenId = params.tokenId;

    return {
      props: {
        tokenId
      }
    }
  }
  
  export default TokenPage;