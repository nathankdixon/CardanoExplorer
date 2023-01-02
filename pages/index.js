import { useEffect, useState} from "react";
import Image from "next/image";
import { BrowserWallet } from "@meshsdk/core";
import Token from "./token";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {

  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState();
  const [policies, setPolicies] = useState([]);
  const [projectsNumber, setProjectsNumber] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState();
  const [searchQuery, setSearchQuery] = useState('');

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
    return policyList;

  }

  async function connect (walletname){
      setIsVisible(true);
      const wallet = await BrowserWallet.enable(walletname);
      const _assetsJson = await wallet.getAssets();
      const _balance = await wallet.getLovelace();
      
      setBalance(_balance/1000000);
      const _tokens = await createTokens(_assetsJson);
      setTokens(_tokens);
      const _policies = groupTokensByPolicyId(_tokens);
      const _sortedPolicyList = sortPolicies(_policies);

      setPolicies(_sortedPolicyList);
      displayTokens(_policies, 'ALL');
      setIsVisible(false);

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

      let token = new Token(element.assetName, element.fingerprint, element.policyId, element.quantity, element.unit);
      console.log(token.unit +" "+token.name);
      token.metadata = await token.getMetadata();
      if(token.metadata != null){
        let ipfs = token.getIpfsFromMetadata();
        token.ipfs = ipfs;
        _tokens.push(token);
      }
    }
    return _tokens;

  }


  function displayTokens(tokenList, type){
    let display = [];
    let keys = Object.keys(tokenList);
    setProjectsNumber(keys.length);
    for(const element of keys){
      let token = tokenList[element][0];
      if(type == 'ALL'){
        display.push(<div key={token.policyId} className="grid-item nft"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
        <div className="item-info">{token.policyId}<div><Link href={"/tokens/"+token.unit}>Open</Link></div></div></div>);
      }
      if(type == 'nft'){
        if(token.quantity == 1){
          display.push(<div key={token.policyId} className="grid-item nft"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
          <div className="item-info">{token.policyId}</div><div><Link href={"/tokens/"+token.unit}>Open</Link></div><div className="item-info">{tokenList[element].length}</div></div>);
        }
      }
      if(type == 'ft'){
        if(token.quantity != 1){
          display.push(<div key={token.policyId} className=" grid-item coin"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
          <div className="item-info">{token.policyId}</div><div><Link href={"/tokens/"+token.unit}>Open</Link></div><div className="item-info">{token.quantity}</div></div>);
        }
      } 

    }
    setDisplay(display);
    return display;
  }


  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.
    router.push(`/tokens/${searchQuery}`);
  };

  const handleButtonPress = (tokenId) => {
    router.push({pathname : `/tokens/${tokenId}`});
  };

  return (
    <div className="app">
        <Head>
        <title>Cardano Token Explorer</title>
      </Head>
      <header>
        <label>tokenExplr.io</label>
        <form className="searchForm" onSubmit={handleSearch}>
          <input type="text" placeholder="Search for a token..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
          <button type="submit" className="walletButton">Search</button>
        </form>
        <label>Connect Wallet:</label>
        <div className="wallets">
          <button className="walletButton" onClick={() => connect('Typhon Wallet')}><img className="wallet-img" src="https://typhonwallet.io/assets/typhon.svg"></img></button>
          <button className="walletButton" onClick={() => connect('eternl')}>Eternl</button>
          <button className="walletButton" onClick={() => connect('Nami')}>Nami</button>
          <button className="walletButton" onClick={() => connect('Flint Wallet')}>Flint</button>
          <div className="loading-symbol" style={{ visibility: isVisible ? 'visible' : 'hidden' }}></div>
        </div>
      </header>
      <nav className="sorting-bar">
        <button className="sort-button" onClick={() => displayTokens(policies, 'nft')}>NFT</button>
        <button className="sort-button" onClick={() => displayTokens(policies, 'ft')}>Coins</button>
        <button className="sort-button" onClick={() => handleButtonPress('0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673135353830')}>Number</button>
        <button className="sort-button">Sort By</button>
        <button className="sort-button">Display Mode</button>
      </nav>
        <div className="wallet-info">
          <div className="token-info">
            <div className="inner">
              Total Number of Tokens: {tokens.length}<br/>
              Number of Projects: {projectsNumber}<br />
              Coin Value: <br/>
              NFT Floor Value <br />
            </div>
          </div>
          <div className="ada-info">
            <div className="inner">
              Ada Balance: {balance}<br/>
              Staking Rewards: <br/>
              Epoch Number: <br/>
              Next Rewards: <br/>
            </div>
          </div>
      </div>

      <div className="projects">
        <div className="tokenList">{display}</div>
      </div>


    </div>

  );
}

export default Home;