import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../header";
import TokenData from "../tokenData";
import WalletButton from "../walletButton";


function TokenPage() {

    const router = useRouter();
    const { tokenId } = router.query;
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearch = async  (event) => {
      event.preventDefault();
      // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.
      if(searchQuery.startsWith('add')){
        let stakeAddress = await getStakeFromAddressKoios(searchQuery);
        router.push(`/${stakeAddress}`);
      }
      else if (searchQuery.startsWith('stake') || searchQuery.startsWith('$')){
        router.push(`/${searchQuery}`);
      }
      else{
        router.push(`/token/${searchQuery}`);
      }
    }

    async function getStakeFromAddressKoios(address){
      const req = await fetch('https://api.koios.rest/api/v0/address_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_addresses": [ address
          ]
        })
      });
  
      const res = await req.json();
      return res[0].stake_address;
    }


    return (
      <div>
      <header>
        <label className="main-label">Explorer</label>
        <form className="searchForm" onSubmit={handleSearch}>
          <input type="text" className = "search-input" placeholder="Search for an address or a specific token..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
          <button type="submit" className="search-button">Search</button>
        </form>
        <WalletButton stake = {'hi'}/>
      </header>
        <TokenData tokenId = {tokenId}/>
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