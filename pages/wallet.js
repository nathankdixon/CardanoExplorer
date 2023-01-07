import { useEffect, useState } from "react";
import Link from "next/link";
import DropdownBox from "./dropdownBox";
import Token from "./token";


function Wallet ({address}) {
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);
  const [tokens, setTokens] = useState();
  const [policies, setPolicies] = useState();
  const [tokensNumber, setTokensNumber] = useState();
  const [projectsNumber, setProjectNumber] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    const getTokens = async () =>{
      if(address == null){
        console.log('address was undefined');
      }
      else{
        const req = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/addresses/'+address,
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
        const _tokenJson = await req.json();

        const _tokens = await createTokens(_tokenJson.amount);
        const _policies = groupTokensByPolicyId(_tokens);
        const out = displayTokens(_policies, 'ALL');
        sessionStorage.setItem(address, _policies);
        setPolicies(_policies);
        setTokens(out);
        setIsVisibleGrid(true);
      }


    }
    getTokens();
  
  }, [address]) 

  function groupTokensByPolicyId(tokenList){
    const policyList = {};
    for(const token in tokenList){
      const policyId = tokenList[token].policyId;
      
      if(policyId in policyList){
        policyList[policyId].push(tokenList[token]);
      }else {
        policyList[policyId] = [tokenList[token]];
      }

    }
    const keys= Object.keys(policyList);
    setProjectNumber(keys.length);
    return sortPolicies(policyList);

  }

  function sortPolicies(policiesList){
    //policies
    const keys = Object.keys(policiesList);
    //token lists
    const values = Object.values(policiesList);
    values.sort((a,b) => a.length - b.length).reverse();
    const _sorted = {};
    for (let i=0;i<keys.length;i++){
      _sorted[keys[i]] = values [i];
    }

    return _sorted;
  }

  async function createTokens(assets){

    const _tokens = [];
    for(const element of assets){
      if(element.unit != 'lovelace'){
        let token = new Token(null, null, null, element.quantity, element.unit);
        token.metadata = await token.getMetadata();
        if(token.metadata != null){
          let ipfs = token.getIpfsFromMetadata();
          token.ipfs = ipfs;
         _tokens.push(token);
        }
      }
      else{
        setBalance((element.quantity)/1000000);
      }

    }
    setTokensNumber(_tokens.length);
    return _tokens;

  }

  function displayTokens(tokenList, type){

    if(tokenList != null){
      let keys = Object.keys(tokenList);
      let display = [];
  
  
      for(const element of keys){
        let token = tokenList[element][0];
        let tokenArr = tokenList[element];
        let tokenDisplay = [];
        for(const element of tokenArr){
          tokenDisplay.push(<div key = {element.unit+'dropbox'} className = "dropdown-content" ><img className = "token-sub-img" src = {element.ipfs}></img><div className="item-info"><Link href={"/token/"+element.unit}>Open</Link></div></div>)
        }
        
  
        if(type == 'ALL'){
          display.push(<div key = {token.unit + 'all'} className="grid-item"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
          <div className="item-info">Policy ID: &nbsp;{token.policyId}<br /></div><div className="item-info">Quantity:&nbsp;{tokenList[element].length}</div></div>);
          display.push(<div key = {token.policyId+'drop1'}><DropdownBox content = {tokenDisplay}/></div>);
        }
        if(type == 'NFT'){
          if(token.quantity == 1){
            display.push(<div key = {token.unit + 'nft'} className="grid-item nft"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
            <div className="item-info">Policy ID: &nbsp;{token.policyId}<br /></div><div className="item-info">Quantity:&nbsp;{tokenList[element].length}</div></div>);
            display.push(<div key = {token.policyId+'drop2'} ><DropdownBox content = {tokenDisplay}/></div>);
          }
        }
        if(type == 'FT'){
          if(token.quantity != 1){
            display.push(<div key = {token.unit + 'coin'} className=" grid-item coin"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
            <div className="item-info">{token.policyId}</div><div><Link href={"/token/"+token.unit}>Open</Link></div><div className="item-info">Quantity:&nbsp;{token.quantity}</div></div>);
          }
        } 
  
      }
      return display;
    }
  }

  function changeDisplay(type){
    setTokens(displayTokens(policies, type));
  }

  return(
    <div style={{ visibility: isVisibleGrid ? 'visible' : 'hidden' }} >
      <div className="wallet-info">
        <div className="token-info">
          <div className="inner">
            Total Number of Tokens: {tokensNumber}<br/>
            Number of Projects: {projectsNumber}<br />
            Coin Value: ₳<br/>
            NFT Floor Value: ₳<br />
            Last NFT Sold <br />
            Newest NFT: <br />
          </div>
        </div>
        <div className="ada-info">
          <div className="inner">
            Balance: {balance}₳<br/>
            Stake Pool: <br/>
            Last Staking Rewards: <br/>
            Epoch Number: <br/>
            Last 5 Transactions: <br/>
            UTXOs: <br/>
          </div>
        </div>
      </div>
      <div>
        <button className="sort-button" onClick={() => changeDisplay('ALL')}>My Wallet</button>
        <button className="sort-button" onClick={() => changeDisplay('NFT')}>NFT</button>
        <button className="sort-button" onClick={() => changeDisplay('FT')}>Coins</button>
      </div>
      <div>
        {tokens}
      </div>

    </div>
  );
}

export default Wallet;