import { useEffect, useState} from "react";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Wallet from "./wallet";
import { Blockfrost, Lucid } from "lucid-cardano";

export default function Header({updatedAddress}){

    const [searchQuery, setSearchQuery] = useState('');
    const [addressQuery, setAddressQuery] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [walletLogo, setWalletLogo] = useState('Connect Wallet');
    const [address, setAddress] = useState('');
    const router = useRouter();

  
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

    const handleCustomAddress = async (event) =>{
      event.preventDefault();
      setShowModal(false);
      if(addressQuery.startsWith('add')){
        let stakeAddress = await getStakeFromAddressKoios(addressQuery);
        router.push(`/address/${stakeAddress}`);
      }
      else if (addressQuery.startsWith('stake')){
        router.push(`/address/${address}`);
      }
      else{
        router.push(`/token/${searchQuery}`);
      }
    }
    
    const handleSearch = async  (event) => {
      event.preventDefault();
      // Use the `router.push` method to navigate to the dynamic page with the entered number as the URL parameter.
      if(searchQuery.startsWith('add')){
        let stakeAddress = await getStakeFromAddressKoios(searchQuery);
        router.push(`/address/${stakeAddress}`);
      }
      else if (searchQuery.startsWith('stake')){
        router.push(`/address/${address}`);
      }
      else{
        router.push(`/token/${searchQuery}`);
      }
    }
  
  
    const handleClick = () => {
      setShowModal(true);
    }
  
    const handleClose = () => {
      setShowModal(false);
    }
  
    const handleSelect = async (wallet) => {
      setShowModal(false);

      let stake = await getStakeAddressFromWallet(wallet);
      router.push(`/address/${stake}`);

    }

    

    return (
        <header>
        <label className="main-label">Explorer</label>
        <form className="searchForm" onSubmit={handleSearch}>
          <input type="text" className = "search-input" placeholder="Search for an address or a specific token..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
          <button type="submit" className="search-button">Search</button>
        </form>
        <div className="connect-wallet">
        <button className="connect-wallet-button" onClick={() => router.push('/')}>Home</button>
        <button className="connect-wallet-button" onClick={handleClick}>{walletLogo}</button>
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
    );
}