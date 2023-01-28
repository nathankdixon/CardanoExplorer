import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../header";
import TokenData from "../tokenData";


function TokenPage() {

    const router = useRouter();
    const { tokenId } = router.query;

    const [address, setAddress] = useState(null);

    const handleAddressUpdate = (newAddress) => {
      setAddress(newAddress);
    }

    return (
      <div>
        <Header updatedAddress={handleAddressUpdate}/>
        <a href="/" className="home-link">Home</a>
        <h1>
          <TokenData tokenId = {tokenId}/>
        </h1>
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