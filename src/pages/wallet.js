import { useEffect, useState } from "react";
import Token from "./token";
import Nfts from "./nfts";
import Fts from "./fts";


function Wallet ({stakeAddress}) {
  const [isVisibleGrid, setIsVisibleGrid] = useState();
  const [isLoading, setisLoading] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState();
  const [stakeData, setStakeData] = useState({stake: null, tokenNumber: null, projectNumber: null, nfts: null, fts: null});

  useEffect(() => {
    const getTokens = async () =>{

      if(stakeAddress == null){
        if(sessionStorage.getItem(stakeAddress)){
          let stakeData = JSON.parse(sessionStorage.getItem(stakeAddress));
          setStakeData(stakeData);
  
          setisLoading('done');
          setIsVisible(false);
          setIsVisibleGrid(true);
        }
        //base
      }
      else{

        setisLoading('fetching');
        setIsVisibleGrid(false);
        setIsVisible(true);

        if(stakeAddress.startsWith('$')){
          let stake = await getAddressFromHandle(stakeAddress.slice(1));
          stakeAddress = stake;
        }

        let stakeData = '';

        //if stake data exist in storage -- get it
        if(sessionStorage.getItem(stakeAddress)){
          stakeData = JSON.parse(sessionStorage.getItem(stakeAddress));
        }

        //if no stored data, create new
        else{
          stakeData = await createStakeDataFromStakeAddress(stakeAddress);
          sessionStorage.setItem(stakeAddress, JSON.stringify(stakeData));

        }

        setStakeData(stakeData);

        setisLoading('done');
        setIsVisible(false);
        setIsVisibleGrid(true);

      }

    }
      
    getTokens();
  }, []);

  if(isLoading == 'fetching'){
    return <div>

      <div className="loading-symbol" style={{ visibility: isVisible ? 'visible' : 'hidden' }}></div>
      <label className="loading-info">{loadingInfo}</label>
    </div>
  }

  async function createStakeDataFromStakeAddress(stake){

    let stakeData = '';
    let assets = await getAssetsFromKoios(stakeAddress);

    //no assets
    if(assets.length == 0 ){
      stakeData = {stake : stakeAddress, tokenNumber: 0, projectNumber:0, nfts: [], fts : []};

    }
    else{
      //assets, create new stake data
      try{
        let _tokens = await createTokens(assets[0].asset_list);
        let _tokenNumber = _tokens.length;
        let _policies = groupTokensByPolicyId(_tokens);
        let _policyNumber = (Object.keys(_policies).length);
        let _fungObj = sortTokenFungibilities(_policies);

        stakeData = {stake: stakeAddress, tokenNumber: _tokenNumber, projectNumber: _policyNumber, nfts: _fungObj.nfts, fts: _fungObj.fts};
      }catch(error){
        console.log(error);
      }

    }

    return stakeData;

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

  const getAddressFromHandle = async (handle) => {
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
  }

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



  async function getAssetsFromKoios(stakeAddress){
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
  }


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

  async function createTokens(assets){


    const _tokens = [];
    for(let i =0; i<assets.length;i++){
      setLoadingInfo('Loading tokens: '+i + ' of ' +assets.length)
      let token = new Token(assets[i].asset_name, assets[i].policy_id, assets[i].quantity);
      token.metadata = await token.getMetadata();
      if(token.metadata != null){
        let ipfs = token.getIpfsFromMetadata();
        token.ipfs = ipfs;
       _tokens.push(token);
      }

    }
    return _tokens;

  }


  return(
    <div style={{ visibility: isVisibleGrid ? 'visible' : 'hidden' }}>
      <div className="wallet">
      <Fts tokens={stakeData} className = 'fts'/>
      <Nfts tokens = {stakeData} className = 'nfts'/>
      </div>
    </div>
  );
}

export default Wallet;

