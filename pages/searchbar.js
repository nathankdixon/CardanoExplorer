const {useRouter} = require('next/router');
const {useState} = require('react');
// search bar component
//  contains a form which takes user input and redirects them to the appropriate page
export default function SearchBar(props){

    // react hook used to store user inputed strings
    const [searchQuery, setSearchQuery] = useState('');

    // next/router, a next.js feature that can redirect users to specific pages.
    const router = useRouter();

    // ** this method takes a string inputted by the user redirects them to the appropriate page

    // base addresses are routed to a 'wallet' page along with the indentifying stake address
    // 
    // @param  -- event triggered by form when text is inputted into the search form
    // when event is triggered, the inputted string gets set to the react hook above called 'searchQuery'
    // this value can then be used to get the inputted string from the user.
    const handleSearch = async  (event) => {
        event.preventDefault();

        // handle base addresses -- containing stake key
        // doesnt include enterprise addresses
        if(searchQuery.startsWith('add')){

          // fetch stake address from blockfrost API
          let stakeAddress = await getStakeFromAddress(searchQuery);
          // redirect user to wallet page with wallet identifying stake address
          if(stakeAddress != null){
            router.push(`/${stakeAddress}`);
          }
          else{
            console.log('not a valid address, not stake address found');
          }
        }

        // handle stake address or ada handle inputs
        // stake addresses always begin with 'stake' and ADA Handles begin with '$' e.g. $james
        else if (searchQuery.startsWith('stake') || searchQuery.startsWith('$')){

          // handles must contain atleast 2 chars e.g. '$a'
          if(searchQuery.length >1){

            // route to wallet page with handle or stake address
            // stake address is fetched from handle on wallet page
            router.push(`/${searchQuery}`);
          }
        }
        else{
          // if neither of above, inputted text may be 'asset ID'
          // then route to token page with 'assetID' and stake address if wallet is connected.
          if(props.stake != null){
            router.push(`/${searchQuery}/?stake=`+props.stake);
          }
          else{
            router.push(`/${searchQuery}`);
          }
        }
      }

    // this method fetches the stake address for any given base address.
    // it uses a Blockfrost API which returns data for specific addresses.

    // @param - a base address, containing the stake key for its wallet.
    // @return a stake address, an account address which can be used to fetch data for its corresponding wallet
    async function getStakeFromAddress(address){
      try{
          // fetch data relating to address
          const req = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/addresses/'+address, 
          {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});

          // JSON returned contains stake address for given base address.
          const res = await req.json();
          if(res.stake_address != null){
              return res.stake_address;
          }
          else{
              return null;
          }
      }
      catch(error){ 
          // handle error
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