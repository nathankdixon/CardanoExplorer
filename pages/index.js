import { useState } from "react";
import { NextPage } from "next";
import { ReactDOM } from "react";
import { BrowserWallet } from "@meshsdk/core";
import Token from "./token";


const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [tokenContent, setTokenContent] = useState([]);
  const [balance, setBalance] = useState();

  function display(tokens, type){
    let nftTagged = [];
    let ftTagged = [];
    for(let i =0;i<tokens.length;i++){
      if(tokens[i].quantity == 1){
        let child = 
        <div key={i} className="NFT">{(JSON.stringify(tokens[i].name))}
        <br></br>
        <img src={+JSON.stringify(tokens[i].ipfs)+'.ipfs.dweb.link'} alt='no image'></img>
        </div>;
      nftTagged.push(child);
      }
      if(tokens[i].quantity != 1){
        let child = 
        <div key={i} className="FT">{(JSON.stringify(tokens[i].name))}
        <br></br>
        {JSON.stringify(tokens[i].quantity)}
        </div>;
      ftTagged.push(child);
      }
    }
    if(type == "fts"){
      return ftTagged;
    }
    else if(type =='nfts'){
      return nftTagged;
    }

  }

  async function connect (walletname){
      const wallet = await BrowserWallet.enable(walletname);
      const _assetsJson = await wallet.getAssets();
      const _balance = await wallet.getLovelace();
      setBalance(_balance/1000000);

      const _tokens = await createTokens(_assetsJson);
      _tokens.sort(function(a,b){
        return a.policyId-b.policyId;
      })
      setTokens(_tokens);
  }

  function showTab(contentType){
    if(contentType == 'nft'){
      setTokenContent(display(tokens, 'nfts'));
    }
    else if(contentType == 'ft'){
      setTokenContent(display(tokens, 'fts'));
    }
  }

  async function createTokens(assets){
    const _tokens = [];
    for(const element of assets){
      let myToken = new Token(element.assetName, element.fingerprint, element.policyId, element.quantity, element.unit);
      _tokens.push(myToken);
      myToken.metadata = await myToken.getMetadata();
      let linkSearch = (myToken.metadata).search(/ipfs/);
      let ipfsLink = "";
      if(linkSearch!=-1){
        ipfsLink = (myToken.metadata.slice(linkSearch, linkSearch+53));
      }
      else{
        ipfsLink = ('null');
      }
      myToken.ipfs = ipfsLink;
      console.log('token ' +element.assetName +', ' +myToken.ipfs);
    }
    return _tokens;

  }

  

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Cardano Explorer</h1>
        <button className="walletButton" onClick={() => connect('eternl')}><img height="90%" width = "90%" src= "https://play-lh.googleusercontent.com/BzpWa8LHTBzJq3bxOUjl-Bp7ixh2VOV_5zk6hZjrk57wRp7sc_kvrf3HCrjdKHL_BtbG=w240-h480-rw"></img></button>
        <button className="walletButton" onClick={() => connect('Nami')}><img height="90%" width = "90%" src= "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0ODYuMTcgNDk5Ljg2Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzM0OWVhMzt9PC9zdHlsZT48L2RlZnM+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBpZD0icGF0aDE2IiBjbGFzcz0iY2xzLTEiIGQ9Ik03My44Nyw1Mi4xNSw2Mi4xMSw0MC4wN0EyMy45MywyMy45MywwLDAsMSw0MS45LDYxLjg3TDU0LDczLjA5LDQ4Ni4xNyw0NzZaTTEwMi40LDE2OC45M1Y0MDkuNDdhMjMuNzYsMjMuNzYsMCwwLDEsMzIuMTMtMi4xNFYyNDUuOTRMMzk1LDQ5OS44Nmg0NC44N1ptMzAzLjM2LTU1LjU4YTIzLjg0LDIzLjg0LDAsMCwxLTE2LjY0LTYuNjh2MTYyLjhMMTMzLjQ2LDE1LjU3SDg0TDQyMS4yOCwzNDUuNzlWMTA3LjZBMjMuNzIsMjMuNzIsMCwwLDEsNDA1Ljc2LDExMy4zNVoiLz48cGF0aCBpZD0icGF0aDE4IiBjbGFzcz0iY2xzLTEiIGQ9Ik0zOC4yNywwQTM4LjI1LDM4LjI1LDAsMSwwLDc2LjQ5LDM4LjI3djBBMzguMjgsMzguMjgsMCwwLDAsMzguMjcsMFpNNDEuOSw2MS44YTIyLDIyLDAsMCwxLTMuNjMuMjhBMjMuOTQsMjMuOTQsMCwxLDEsNjIuMTgsMzguMTNWNDBBMjMuOTQsMjMuOTQsMCwwLDEsNDEuOSw2MS44WiIvPjxwYXRoIGlkPSJwYXRoMjAiIGNsYXNzPSJjbHMtMSIgZD0iTTQwNS43Niw1MS4yYTM4LjI0LDM4LjI0LDAsMCwwLDAsNzYuNDYsMzcuNTcsMzcuNTcsMCwwLDAsMTUuNTItMy4zQTM4LjIyLDM4LjIyLDAsMCwwLDQwNS43Niw1MS4yWm0xNS41Miw1Ni40YTIzLjkxLDIzLjkxLDAsMSwxLDguMzktMTguMThBMjMuOTEsMjMuOTEsMCwwLDEsNDIxLjI4LDEwNy42WiIvPjxwYXRoIGlkPSJwYXRoMjIiIGNsYXNzPSJjbHMtMSIgZD0iTTEzNC41OCwzOTAuODFBMzguMjUsMzguMjUsMCwxLDAsMTU3LjkyLDQyNmEzOC4yNCwzOC4yNCwwLDAsMC0yMy4zNC0zNS4yMlptLTE1LDU5LjEzQTIzLjkxLDIzLjkxLDAsMSwxLDE0My41NCw0MjZhMjMuOSwyMy45LDAsMCwxLTIzLjk0LDIzLjkxWiIvPjwvZz48L2c+PC9zdmc+"></img></button>
        <button className="walletButton" onClick={() => connect('Typhon Wallet')}><img height="90%" width = "90%" src= "chrome-extension://kfdniefadaanbjodldohaedphafoffoh/assets/typhon.png"></img></button>
        <button className="walletButton" onClick={() => connect('Flint Wallet')}><img height="90%" width = "90%" src= "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkwIiBoZWlnaHQ9IjE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIj4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8cGF0aCBkPSJtNTYuMDExLDU5LjM4NWw0My40NjIyLC00NC4wODMzYzIuOTcwOCwtMy4yNTM0IDQuMDMxOCwtMi45MzY1IDUuMDQ0OCwwLjc4NzJsMC4zODgsMzEuNDg4MWMtMC4xMDgsNC45MTM2IC0wLjQ2NSw3LjAzMjYgLTEuOTQsOS4wNTI4bC0yNi4zODgxLDI3LjE1ODVjLTMuNDUwNCw0LjI2NjcgLTIuOTc2OSw1Ljk2OTggLTMuMTA0NCw3Ljg3MmMtMC4xMjc2LDEuOTAyMiAzLjM1NzQsNy40NDg0IDkuMzEzMyw3Ljg3MjFjMCwwIDE2LjE1MDUsMC4wMDMzIDE3Ljg1MDIsMGMxLjcsLTAuMDAzNCAyLjg5MSwyLjczNDYgMCw1LjUxMDZsLTM2LjQ3NjksMzYuNjA1Yy00LjUxNDMsNC4yNTIgLTcuMDY4LDQuMjQgLTExLjY0MTYsMi43NTVjLTcuMDE5NiwtMy45MzUgLTcuMTQ1LC03LjU2NyAtNy4zNjM4LC0xMy45MDFsLTAuMDA5MywtMC4yNjlsMCwtNDAuMTQ3MWMtMC4yNDMxLC0xMi43OTgzIDEuNTg2NiwtMTkuNjE4MSAxMC44NjU2LC0zMC43MDA5eiIgZmlsbD0iI0ZGNjEwMCIgaWQ9InN2Z18xIi8+CiAgPHBhdGggZD0ibTEzNC43MSwxMzEuNTlsLTQ0Ljc3ODgsNDQuMDgzYy0zLjA2MTEsMy4yNTQgLTQuMTU0LDIuOTM3IC01LjE5NzYsLTAuNzg3bC0wLjM5OTgsLTMxLjQ4OGMwLjExMDcsLTQuOTEzIC0wLjA3NTMsLTIuOTk4NTcgNi4zNTAyNiwtMTAuOTI0MjRsMjIuODM1OTQsLTI1LjI4Njc2YzMuNTU1LC00LjI2NyAzLjA2NywtNS45NyAzLjE5OSwtNy44NzIyYzAuMTMxLC0xLjkwMjIgLTMuNDU5LC03LjQ0ODQgLTkuNTk2LC03Ljg3MjFjMCwwIC0xNi42Mzk3LC0wLjAwMzMgLTE4LjM5MTMsMGMtMS43NTE1LDAuMDAzNCAtMi45Nzg3LC0yLjczNSAwLC01LjUxMDRsMzcuNTgyMywtMzYuNjA1YzQuNjUxLC00LjI1MjMgNy4yODMsLTQuMjQwNSAxMS45OTUsLTIuNzU1MmM3LjIzMiwzLjkzNSA3LjM2MSw3LjU2NzQgNy41ODcsMTMuOTAxM2wwLjAwOSwwLjI2ODRsMCw0MC4xNDcyYzAuMjUxLDEyLjc5OSAtMS42MzQsMTkuNjE4IC0xMS4xOTUsMzAuNzAxeiIgZmlsbD0iI0ZGNjEwMCIgaWQ9InN2Z18yIi8+CiA8L2c+Cgo8L3N2Zz4="></img></button>
      </div>
      <div className="adaBalance">Balance : {balance} Ada</div>
      <button className="contentButton" onClick = {() => showTab('nft')}>NFTs</button>
      <button className= "ftbutton" onClick = {() => showTab('ft')}>FTs</button>
      <div className="tokens">
        {tokenContent}
      </div>
      

    </div>
  );
};

export default Home;