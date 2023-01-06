import { useState} from "react";
import { BrowserWallet } from "@meshsdk/core";
import Token from "./token";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Wallet from "./wallet";

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState();
  const [policies, setPolicies] = useState([]);
  const [projectsNumber, setProjectsNumber] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);
  const [type, setType] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallet, setSelectedWallet] = useState("Connect Wallet")
  const [showModal, setShowModal] = useState(false)
  const [walletLogo, setWalletLogo] = useState('Connect Wallet');
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
    try{
      const wallet = await BrowserWallet.enable(walletname);
      setIsVisible(true);
      const _assetsJson = await wallet.getAssets();
      const _balance = await wallet.getLovelace();
      setBalance(_balance/1000000);
      const _tokens = await createTokens(_assetsJson);
      setTokens(_tokens);
      const _policies = groupTokensByPolicyId(_tokens);
  
      const _sortedPolicyList = sortPolicies(_policies);
  
      setPolicies(_sortedPolicyList);
      sessionStorage.setItem('wallet', JSON.stringify(_sortedPolicyList));
      displayTokens(_sortedPolicyList, 'ALL');
      let keys = Object.keys(_sortedPolicyList);
      setProjectsNumber(keys.length);
      setIsVisible(false);
      setIsVisibleGrid(true);
    }catch(error){
      console.log(error);
    }




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
    setPolicies(tokenList);
    setType(type);
    setIsVisibleGrid(true);
  }

  function reverseList(policyList){
    const values = Object.values(policyList);
    values.sort((a,b) => a.length - b.length);
    setPolicies(policyList)
  }


  const handleSearch = (event) => {
    event.preventDefault();
    // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.
    router.push(`/token/${searchQuery}`);
  };

  const handleButtonPress = (tokenId) => {
    router.push({pathname : `/token/${tokenId}`});
  };

  const handleClick = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleSelect = (wallet) => {
    setSelectedWallet(wallet);
    let logo = '';
    if(wallet == 'Typhon Wallet'){
      logo = <img className="logo-img" src="/typhon.svg"></img>
    }
    if(wallet == 'eternl'){
      logo = <img className="logo-img" src="/eternl.png"></img>
    }
    if(wallet == 'Nami'){
      logo = <img className="logo-img" src="/nami.svg"></img>
    }
    if(wallet == 'Flint Wallet'){
      logo = <img className="logo-img" src="/flint.png"></img>
    }
    setWalletLogo(logo);
    connect(wallet);
    setShowModal(false);
  }


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
        <div className="loading-symbol" style={{ visibility: isVisible ? 'visible' : 'hidden' }}></div>
        <div className="connect-wallet">
        <button className="connect-wallet-button" onClick={handleClick}>{balance}₳ {walletLogo}</button>
        { showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Select Wallet</h2>
              <div>
                <button className="walletButton" onClick={() => handleSelect('Typhon Wallet')} style={{backgroundImage:`url(${'/typhon.svg'})`}}>Typhon</button>
                <button className="walletButton" onClick={() => handleSelect('eternl')} style={{backgroundImage:`url(${'/eternl.png'})`}}>Eternl</button>
                <button className="walletButton" onClick={() => handleSelect('Nami')} style={{backgroundImage:`url(${'/nami.svg'})`}}>Nami</button>
                <button className="walletButton" onClick={() => handleSelect('Flint Wallet')} style={{backgroundImage:`url(${'/flint.png'})`}}>Flint</button><br/>
                <input className="search-input" placeholder="Enter wallet address"></input>
              </div>
              <button className="cancel-button" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      </header>

      <nav className="sorting-bar">
        <button className="sort-button" onClick={() => displayTokens(policies, 'ALL')}>My Wallet</button>
        <button className="sort-button" onClick={() => displayTokens(policies, 'nft')}>NFT</button>
        <button className="sort-button" onClick={() => displayTokens(policies, 'ft')}>Coins</button>
        <button className="sort-button" onClick={() => handleButtonPress('0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673135353830')}>Unsig</button>
        <button className="sort-button" onClick={() => reverseList(policies)}>Sort By</button>
      </nav>
        <div className="wallet-info">
          <div className="token-info">
            <div className="inner">
              Total Number of Tokens: {tokens.length}<br/>
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
            </div>
          </div>
      </div>
      <div className="projects"><label className="main-label">Assets:</label>
        <div className="tokenList" style={{ visibility: isVisibleGrid ? 'visible' : 'hidden' }}><Wallet list = {policies} type = {type}/></div>
      </div>


    </div>

  );
}

export default Home;