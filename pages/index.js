import { useEffect, useState} from "react";
import Image from "next/image";
import { BrowserWallet } from "@meshsdk/core";
import Token from "./token";
import React from "react";
import Head from "next/head";
import { userAgentFromString } from "next/server";


const Home = () => {

  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState();
  const [policies, setPolicies] = useState([]);
  const [coins, setCoins] = useState([]);
  const [projectsNumber, setProjectsNumber] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [display, setDisplay] = useState();

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
      let nftList = sortFungibilities(_sortedPolicyList);
      displayNfts(nftList);
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

  function sortFungibilities(policyList){

    const nfts = [];
    const fts = [];
    let policies = Object.keys(policyList);
    let tokens = Object.values(policyList);

    for(const element of policies){
      let firstToken = policyList[element][0];
      if(firstToken.quantity == 1){
        nfts.push(policyList[element]);
      }else{
        fts.push(policyList[element]);
      }
    }

    setNfts(nfts);
    setCoins(fts);
    return nfts;
  }

  async function createTokens(assets){
    const _tokens = [];
    for(const element of assets){

      let token = new Token(element.assetName, element.fingerprint, element.policyId, element.quantity, element.unit);
      token.metadata = await token.getMetadata();
      if(token.metadata != null){
        //console.log(token.metadata);
        let ipfs = getIpfsFromMetadata(token);
        token.ipfs = ipfs;
        _tokens.push(token);
      }
    }
    return _tokens;

  }


  function getIpfsFromMetadata(token){
    const keys = Object.keys(token.metadata);
    const values = Object.values(token.metadata);
    let ipfs = "";
    for(let i=0;i<keys.length;i++){
      if(keys[i] == "image"){
        ipfs = values[i];
      }

      if(keys[i] == "logo"){
        //console.log(token.metadata);
        ipfs = "data:image/png;base64,"+values[i]
      }
    }
    try{
      if(Array.isArray(ipfs)){
        let newipfs = "";
        for(let i=0; i<ipfs.length;i++){
          newipfs = newipfs + ipfs[i];
        }
        if(newipfs.startsWith('ba')){
          newipfs = "http://dweb.link/ipfs/"+ipfs;
          newipfs = newipfs.replace(/,/g, '');
        }
        return newipfs;
      }
      if(ipfs.startsWith('ipfs://')){
        ipfs = ipfs.slice(7);
        if(ipfs.startsWith('ipfs/')){
          ipfs = ipfs.slice(5);
        }
        ipfs = "http://dweb.link/ipfs/"+ipfs;
      }
      if(ipfs.startsWith('ipfs/')){
        ipfs = ipfs.slice(5);
        ipfs = "http://dweb.link/ipfs/"+ipfs;
      }
      if(ipfs.startsWith('Qm')){
        ipfs = "http://dweb.link/ipfs/"+ipfs;
      }
    }catch{
      return null;
    }

    return ipfs;

  }

  function Metadata({ metadata }) {
    return (
      <div>
        {Object.entries(metadata).map(([key, value]) => (
                  <React.Fragment key={key}>
                    {typeof value === 'object' ? (
                      <tr>
                        <td colSpan={2}>{key}</td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    )}
                    {typeof value === 'object' ? (
                      <tr>
                        <td colSpan={2}>
                          <Metadata metadata={value} />
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                ))}
      </div>
    );
  }


  function displayNfts(nftList){
    let display = [];
    let keys = Object.keys(nftList);
    setProjectsNumber(keys.length);
    for(let i = 0; i<keys.length;i++){
      display.push(<div key={i} className="grid-item-nft"><img className = "token-img" src={nftList[keys[i]][0].ipfs} alt = 'failed to load image'></img></div>);
    }
    setDisplay(display);
    return display;
  }

  function displayCoins(coinList){
    let display = [];
    let keys = Object.keys(coinList);
    for(let i = 0; i<keys.length;i++){
      display.push(<div key={i} className="grid-item-coin"><img className = "token-img" src={coinList[keys[i]][0].ipfs} alt = 'failed to load image'></img></div>);
    }
    setDisplay(display);
    return display;
  }


  return (
    <div className="app">
        <Head>
        <title>Cardano Token Explorer</title>
      </Head>
      <header>
        <label>tokenExplr.io</label>
        <form className="searchForm">
          <input type="text" placeholder="Search for a token..." />
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
        <button className="sort-button" onClick={() => displayNfts(nfts)}>NFT</button>
        <button className="sort-button" onClick={() => displayCoins(coins)}>Coins</button>
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