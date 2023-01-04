import { useCallback, useContext, useEffect, useState} from "react";
import Image from "next/image";
import { BrowserWallet } from "@meshsdk/core";
import Token from "./token";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import DropdownBox from "./dropdownBox";

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState();
  const [policies, setPolicies] = useState([]);
  const [projectsNumber, setProjectsNumber] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);
  const [display, setDisplay] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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
    console.log(_sortedPolicyList);
    setPolicies(_sortedPolicyList);
    sessionStorage.setItem('wallet', JSON.stringify(_sortedPolicyList));
    displayTokens(_sortedPolicyList, 'ALL');
    setIsVisible(false);
    setIsVisibleGrid(true);


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
    

    if(sessionStorage.getItem('wallet')){
      tokenList = JSON.parse(sessionStorage.getItem('wallet'));
    }
    let display = [];
    let keys = Object.keys(tokenList);
    setProjectsNumber(keys.length);
    for(const element of keys){
      let token = tokenList[element][0];
      let tokenArr = tokenList[element];
      let tokenDisplay = [];
      for(const element of tokenArr){
        tokenDisplay.push(<div className = "dropdown-content" key = {element.name}><img className = "token-sub-img" src = {element.ipfs}></img><div className="item-info">Name:&nbsp;{element.name}</div><div className="item-info"><Link href={"/token/"+element.unit}>Open</Link></div></div>)
      }
      

      if(type == 'ALL'){
        display.push(<div key={token.policyId} className="grid-item"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
        <div className="item-info">Policy ID: &nbsp;{token.policyId}<br /></div><div className="item-info">Quantity:&nbsp;{tokenList[element].length}</div></div>);
        display.push(<div><DropdownBox content = {tokenDisplay}/></div>);
      }
      if(type == 'nft'){
        if(token.quantity == 1){
          display.push(<div key={token.policyId} className="grid-item nft"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
          <div className="item-info">Policy ID: &nbsp;{token.policyId}<br /></div><div className="item-info">Quantity:&nbsp;{tokenList[element].length}</div></div>);
          display.push(<div><DropdownBox content = {tokenDisplay}/></div>);
        }
      }
      if(type == 'ft'){
        if(token.quantity != 1){
          display.push(<div key={token.policyId} className=" grid-item coin"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
          <div className="item-info">{token.policyId}</div><div><Link href={"/token/"+token.unit}>Open</Link></div><div className="item-info">Quantity:&nbsp;{token.quantity}</div></div>);
        }
      } 

    }
    setDisplay(display);
    setIsVisibleGrid(true);
    return display;
  }


  const handleSearch = (event) => {
    event.preventDefault();
    // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.
    router.push(`/token/${searchQuery}`);
  };

  const handleButtonPress = (tokenId) => {
    router.push({pathname : `/token/${tokenId}`});
  };

  return (
    <div className="app">
        <Head>
        <title>Cardano Token Explorer</title>
      </Head>
      <header>
        <label className="main-label">tokenExplr.io</label>
        <form className="searchForm" onSubmit={handleSearch}>
          <input type="text" className = "search-input" placeholder="Search for a token..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
          <button type="submit" className="search-button">Search</button>
        </form>
        <label>Connect Wallet:</label>
        <div className="loading-symbol" style={{ visibility: isVisible ? 'visible' : 'hidden' }}></div>
        <div className="wallets">
          <button className="walletButton" onClick={() => connect('Typhon Wallet')}><img className="wallet-img" src="https://typhonwallet.io/assets/typhon.svg"></img></button>
          <button className="walletButton" onClick={() => connect('eternl')}><img className="wallet-img" src="https://play-lh.googleusercontent.com/BzpWa8LHTBzJq3bxOUjl-Bp7ixh2VOV_5zk6hZjrk57wRp7sc_kvrf3HCrjdKHL_BtbG"></img></button>
          <button className="walletButton" onClick={() => connect('Nami')}><img className="wallet-img" src="https://lh3.googleusercontent.com/xpxFzm6RFpD4fIUFumHeuXE_sl17mTVACXCxT24NeXsum5KnLHZB0i8Am6Hn8BR8kzU7t9gC3VGjDjYagPJEwMNXwA=w128-h128-e365-rj-sc0x00ffffff"></img></button>
          <button className="walletButton" onClick={() => connect('Flint Wallet')}><img className="wallet-img" src="https://play-lh.googleusercontent.com/ZBRe6rVx5Y2g9u5sWJMxrt2kQga1bmiJX7wg-ZjJbgiBC_MzUFwQCk9JO5yfbzRH40_9=w240-h480-rw"></img></button>
        </div>
      </header>
      <nav className="sorting-bar">
        <button className="sort-button" onClick={() => displayTokens(policies, 'nft')}>NFT</button>
        <button className="sort-button" onClick={() => displayTokens(policies, 'ft')}>Coins</button>
        <button className="sort-button" onClick={() => displayTokens(policies, 'ALL')}>All</button>
        <button className="sort-button" onClick={() => handleButtonPress('0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673135353830')}>Unsig</button>
        <button className="sort-button">Sort By</button>
      </nav>
        <div className="wallet-info">
          <div className="token-info">
            <div className="inner">
              Total Number of Tokens: {tokens.length}<br/>
              Number of Projects: {projectsNumber}<br />
              Coin Value: <br/>
              NFT Floor Value: <br />
              Last NFT Sold <br />
              Newest NFT: <br />
            </div>
          </div>
          <div className="ada-info">
            <div className="inner">
              Ada Balance: {balance}<br/>
              Stake Pool: <br/>
              Last Staking Rewards: <br/>
              Epoch Number: <br/>
              Last 5 Transactions: <br/>
            </div>
          </div>
      </div>
      <div className="projects"><label className="main-label">Assets</label>
        <div className="tokenList" style={{ visibility: isVisibleGrid ? 'visible' : 'hidden' }}>{display}</div>
      </div>


    </div>

  );
}

export default Home;