import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Token from "../token";
import Wallet from "../wallet";


function AddressPage({data}) {

    const router = useRouter();
    const { address } = router.query;

    return (
      <div>
        <a href="/" className="home-link">Home</a>
        <h1 className="main-title">Address :  {address}</h1>
        <div className="projects"><label className="main-label">Assets:</label>
          <div className="tokenList"><Wallet address={address}/></div>
        </div>
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
    const address = params.address;




    return {
      props: {
        address
      }
    }
  }
  
  export default AddressPage;