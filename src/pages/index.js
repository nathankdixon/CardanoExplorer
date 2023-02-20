import { useState} from "react";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Wallet from "./walletData";
import { Blockfrost, Lucid } from "lucid-cardano";
import Header from "./header";

const Home = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();
  const [isLoading, setisLoading] = useState(null);
  const [isVisible, setIsVisible] = useState(false);



    const handleAddressUpdate = (newAddress) => {
      setAddress(newAddress);
    }
  
    async function getStakeAddressFromWallet(wallet){

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
    
    const handleSearch = async  (event) => {
      event.preventDefault();
      setisLoading('fetching');
      setIsVisible(true);
      // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.
      if(searchQuery.startsWith('add') ){
        let stakeAddress = await getStakeFromAddressKoios(searchQuery);
        router.push(`/${stakeAddress}`);
      }
      else if (searchQuery.startsWith('stake') || searchQuery.startsWith('$')){
        router.push(`/${searchQuery}`);
      }
      else{
        router.push(`/token/${searchQuery}`);
      }
    }
  
    const handleSelect = async (wallet) => {
      setisLoading('fetching');
      setIsVisible(true);
      let stake = await getStakeAddressFromWallet(wallet);
      router.push(`/${stake}`);
    }

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
        <form  className= 'search-main'onSubmit={handleSearch}>
          <input type="text" className = "searchbar" placeholder="Enter address, $handle or asset ID..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
          <button type="submit" className="search-button">Search</button>
        </form>
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