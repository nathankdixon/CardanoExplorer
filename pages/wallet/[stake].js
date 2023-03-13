import { useRouter } from "next/router";
import SearchBar from "../searchbar";
import WalletButton from "../walletButton";
import WalletData from "../walletData";


const { useState, useEffect } = require("react");

// page which displays wallet data
// contains search bar and wallet button
function StakePage() {

  // router object
  const router = useRouter();

  // stake address from url
  const { stake } = router.query;

  return (
      <WalletData stake={stake}/>
  );
}

export async function getStaticPaths() {
    // This function creates the dynamic paths for the page.
    // can be any number of paths - as stake addresses are unique
    
    return {
      paths: [],
      fallback: true
    };
  }

export async function getStaticProps({ params }) {
    // This function fetches the data for the page.
    // params contains the stake address from the url
    let stake = params.stake;
  
    return {
      props: {
        stake
      }
    }
  }
  
  export default StakePage;