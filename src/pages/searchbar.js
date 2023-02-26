import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchBar(){

    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();


    const handleSearch = async  (event) => {
        event.preventDefault();
        // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.
        if(searchQuery.startsWith('add')){
          let stakeAddress = await getStakeFromAddressKoios(searchQuery);
          if(stakeAddress != null){
            router.push(`/${stakeAddress}`);
          }
        }
        else if (searchQuery.startsWith('stake') || searchQuery.startsWith('$')){
          if(searchQuery.length >2){
            router.push(`/${searchQuery}`);
          }
        }
        else if(searchQuery.length > 2){
          router.push(`/token/${searchQuery}`);
        }
        else{
            // bad input
        }
      }

      async function getStakeFromAddressKoios(address){
        try{
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
        }catch(error){
            console.log(error);
            return null;
        }

      }

    return(
        <form className="searchForm" onSubmit={handleSearch}>
            <input type="text" className = "search-input" placeholder="Search for an address or a specific token..."  value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
            <button type="submit" className="search-button">Search</button>
        </form>
    )
}