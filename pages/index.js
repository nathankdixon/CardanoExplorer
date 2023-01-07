import { useState} from "react";
import { BrowserWallet } from "@meshsdk/core";
import Token from "./token";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Wallet from "./wallet";
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher";

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState();
  const [policies, setPolicies] = useState([]);
  const [projectsNumber, setProjectsNumber] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleGrid, setIsVisibleGrid] = useState(false);
  const [address, setAddress] = useState(null);
  const [type, setType] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallet, setSelectedWallet] = useState();
  const [addressQuery, setAddressQuery] = useState('');
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
    ;
    return sortPolicies(policyList);

  }





  const handleCustomAddress = async (event) =>{
    event.preventDefault();
    setShowModal(false);
    setIsVisible(true);
    setWalletLogo('');
    setAddress(addressQuery);
    setIsVisible(false);
    setIsVisibleGrid(true);
  }





  const handleSearch = (event) => {
    event.preventDefault();
    // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.
    if(searchQuery.startsWith('add')){
      router.push(`/address/${searchQuery}`);
    }
    else{
      router.push(`/token/${searchQuery}`);
    }

  };

  const handleButtonPress = (tokenId) => {
    if(searchQuery.startsWith('add')){
      router.push(`/address/${searchQuery}`);
    }else{
      router.push({pathname : `/token/${tokenId}`});

    }
  };

  const handleClick = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleSelect = async (wallet) => {
    setSelectedWallet(wallet);
    setShowModal(false);
    setIsVisible(true);
    const _wallet = await BrowserWallet.enable(wallet);
    const _address = await _wallet.getChangeAddress();
    setAddress(_address);
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
    setIsVisible(false);
    setIsVisibleGrid(true);
  }


  return (
    <div className="app">
        <Head>
        <title>Cardano Token Explorer</title>
      </Head>
      <header>
        <label className="main-label">tokenExplr.io</label>
        <form className="searchForm" onSubmit={handleSearch}>
          <input type="text" className = "search-input" placeholder="Search for an address or a specific token..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
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
                <form className="searchForm" onSubmit={handleCustomAddress}>
                  <input className="search-input" placeholder="Enter wallet address" value={addressQuery} onChange={(event) => setAddressQuery(event.target.value)}></input>
                  <button type="submit" className="search-button">Search</button>
                </form>

              </div>
              <button className="cancel-button" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      </header>

      <nav className="sorting-bar">
        <button className="sort-button" onClick={() => handleButtonPress('0e14267a8020229adc0184dd25fa3174c3f7d6caadcb4425c70e7c04756e7369673135353830')}>Unsig</button>
      </nav>
      <div className="projects" style={{ visibility: isVisibleGrid ? 'visible' : 'hidden' }} ><label className="main-label">Assets:</label>
        <div className="tokenList" ><Wallet address = {address}/></div>
      </div>


    </div>

  );
}

export default Home;