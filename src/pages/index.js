import { useState} from "react";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {  Lucid } from "lucid-cardano";
import SearchBar from "./searchbar";

const Home = () => {

  const router = useRouter();
  const [isLoading, setisLoading] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
    // gets stake address from wallet using cip-30 and lucid
    async function getStakeAddressFromWallet(wallet){
      try{
        const lucid = await Lucid.new();
        var api = '';
    
        if(wallet == 'Typhon Wallet'){
          api = await window.cardano.typhoncip30.enable();
        }
        if(wallet == 'eternl'){
          api = await window.cardano.eternl.enable();
        }
        if(wallet == 'Nami'){
          api = await window.cardano.nami.enable();
        }
        if(wallet == 'Flint Wallet'){
          api = await window.cardano.flint.enable();
        }
        
        lucid.selectWallet(api);
        let stake = await lucid.wallet.rewardAddress();
        return stake;
      }catch(error){
        return null;
      }

    }
  
    const handleSelect = async (wallet) => {
      setisLoading('fetching');
      setIsVisible(true);
      let stake = await getStakeAddressFromWallet(wallet);

      if(stake!= null){
        router.push(`/${stake}`);
      }
    }

    // loading icon
    if(isLoading == 'fetching'){
      return <div>
        <div className="loading-symbol" style={{ visibility: isVisible ? 'visible' : 'hidden' }}></div>
      </div>
    }

  return (
    <div className="app">
      <Head>
        <title>Cardano Token Explorer</title>
      </Head>
      <div className="index">
        <div className = "main-title">Cardano Explorer</div>
        <SearchBar />
        <div className="connect-wallet-main">
          <button className="walletButton-main" onClick={() => handleSelect('Typhon Wallet')}><img className="wallet-img" src='/typhon.svg'></img></button>
          <button className="walletButton-main" onClick={() => handleSelect('eternl')}><img className="wallet-img" src='/eternl.png'></img></button>
          <button className="walletButton-main" onClick={() => handleSelect('Nami')}><img className="wallet-img" src='/nami.svg'></img></button>
          <button className="walletButton-main" onClick={() => handleSelect('Flint Wallet')}><img className="wallet-img" src='/flint.png'></img></button><br/>
        </div>
      </div>
    </div>

  );
}

export default Home;