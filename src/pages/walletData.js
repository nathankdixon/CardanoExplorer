import { useEffect, useState } from "react";
import Token from "./token";
import WalletDisplay from "./walletDisplay";


function WalletData (props) {
  const [isVisibleGrid, setIsVisibleGrid] = useState();
  const [isLoading, setisLoading] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState();
  const [walletData, setWalletData] = useState({stake: null, tokenNumber: null, projectNumber: null, nfts: null, fts: null});

  useEffect(() => {
    const getTokens = async () =>{

      if(props.stakeAddress == null){
        //base
      }
      else{

        //loading icon
        setisLoading('fetching');
        setIsVisibleGrid(false);
        setIsVisible(true);

        // props passed from [stake].js
        let stakeAddress = props.stakeAddress;

        // check if stake is a handle
        // then get base address then stake address from that handle
        if(stakeAddress.startsWith('$')){
          let stake = await getAddressFromHandle(stakeAddress.slice(1));
          if(stake != null){
            stakeAddress = stake;
          }
          else{
            console.log('wallet error');
          }
        }

        // used to store and retrieve wallet information in local storage
        let walletData = '';

        //if stake data exist in storage -- get it
        if(localStorage.getItem(stakeAddress)){
          walletData = JSON.parse(localStorage.getItem(stakeAddress));
        }

        //if no stored data, create new and store it with stake address as key
        else{
          walletData = await createWalletDataFromStakeAddress(stakeAddress);

          if(walletData != null){
            localStorage.setItem(stakeAddress, JSON.stringify(walletData));
          }
        }

        // loading icon
        setWalletData(walletData);
        setisLoading('done');
        setIsVisible(false);
        setIsVisibleGrid(true);

      }
    }
    getTokens();
  }, [props]);


  async function createWalletDataFromStakeAddress(stake){

    let walletData = '';
    let assets = await getAssetsFromKoios(stake);

    //no assets
    if(assets.length == 0 || assets == null){
      walletData = {stake : stake, tokenNumber: 0, projectNumber:0, nfts: [], fts : []};
    }
    else{
      //assets, create new stake data
      try{
        // list of 'token' objects with assgined attributes
        let _tokens = await createTokens(assets[0].asset_list);

        // total number of tokens - used in summary
        let _tokenNumber = _tokens.length;

        // create list of policy Ids - with tokens sorted into policies
        let _policies = groupTokensByPolicyId(_tokens);

        // number of difference projects
        // used in summary
        let _policyNumber = (Object.keys(_policies).length);

        // splits policy list into two lists - nfts and fts, then combines into object = fungObj {nfts, fts}
        let _fungObj = sortTokenFungibilities(_policies);

        // wallet data object which is stored in local storage for quick retrieval
        walletData = {stake: stake, tokenNumber: _tokenNumber, projectNumber: _policyNumber, nfts: _fungObj.nfts, fts: _fungObj.fts};

      }catch(error){
        return null;
      }
    }
    return walletData;

  }

  // used when fetching handle address
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
      return null;
    }

  }

  // returns base address from handle
  const getAddressFromHandle = async (handle) => {
    try{
      let policyID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';
    
      // A blank Handle name should always be ignored.
      if (handle.length === 0) {
        // Handle error.
      }
    
      // Convert handleName to hex encoding.
      let assetName = Buffer.from(handle).toString('hex');
    
      const data = await fetch(
        `https://cardano-mainnet.blockfrost.io/api/v0/assets/${policyID}${assetName}/addresses`,
        {
          headers: {
            // Your Blockfrost API key
            project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh',
            'Content-Type': 'application/json'
          }
        }
      ).then(res => res.json());
      
      let stake = await getStakeFromAddressKoios(data[0].address);
      return stake;
    }catch(error){
      return null;
    }

  }

  // no asset limit on how many assets gets returned on one request
  // koios, blockfrost is limited by 100 results per page
  async function getAssetsFromKoios(stakeAddress){
    try{
      const req = await fetch('https://api.koios.rest/api/v0/account_assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_stake_addresses": [
            stakeAddress
          ]
        })
      });

      const res = await req.json();
      return res;
    }catch(error){
      return null;
    }

  }

  // creates a list of 'token' objects and sorts them by price
  // token (asset_name, quantity, policy, metadata, prices, current (price))
  async function createTokens(assets){
    const _tokens = [];

    for(let i =0; i<assets.length;i++){
      setLoadingInfo('Loading tokens: '+i + ' of ' +assets.length)
      let token = new Token(assets[i].asset_name, assets[i].policy_id, assets[i].quantity);

      // return data under 'onchain_metadata' or 'metadata'
      token.metadata = await token.getMetadata();

      // returns price data if available on CoinGecko
      let prices = await token.getPrice();

      if(prices != ''){
        token.current = prices.current;
        token.prices = prices;
      }
      else{
        token.prices = '';
        token.current = -1;
      }

      //fetch  ipfs image from metadatat
      if(token.metadata != null){
        let ipfs = token.getIpfsFromMetadata();
        token.ipfs = ipfs;
       _tokens.push(token);
      }
    }

    // list of 'token' objects sorted by price attribute
    let priceSorted = sortByPrice(_tokens);
    return priceSorted;
  }

  // groups list of token objects by policy Id
  function groupTokensByPolicyId(tokenList){

    const policyList = {};
    for(const token in tokenList){
      const policyId = tokenList[token].policy_id;
      
      if(policyId in policyList){
        policyList[policyId].push(tokenList[token]);
      }else {
        policyList[policyId] = [tokenList[token]];
      }

    }
    const keys= Object.keys(policyList);

    //sort policy list by collection number
    const values = Object.values(policyList);
    values.sort((a,b) => a.length - b.length).reverse();
    const _sorted = {};
    for (let i=0;i<keys.length;i++){
      _sorted[keys[i]] = values [i];
    }
    return _sorted;
  }

  // sort tokens by price
  function sortByPrice(list) {
    return list.sort((a, b) => a.current - b.current);
  }

  // splits token by whether quantity is 1 or not (fungibility)
  // returns object of two lists - fts and nfts
  function sortTokenFungibilities(policies){
    let poly = Object.keys(policies);
    let _nfts = [];
    let _fts = [];
    for(const element of poly){
      let p = policies[element][0];
      if(p.quantity == 1){
        _nfts.push(policies[element]);
      }
      else{
        _fts.push(policies[element]);
      }
    }
    return {nfts : _nfts, fts : _fts};
  }

  // displays while token data is being fetched
  if(isLoading == 'fetching'){
    return <div>

      <div className="loading-symbol" style={{ visibility: isVisible ? 'visible' : 'hidden' }}></div>
      <label className="loading-info">{loadingInfo}</label>
    </div>
  }

  return(
    <div style={{ visibility: isVisibleGrid ? 'visible' : 'hidden' }}>
      <WalletDisplay data = {walletData}/>
    </div>
  );
}

export default WalletData;
