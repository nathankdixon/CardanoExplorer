import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "./searchbar";
import Head from "next/head";
import { Lucid } from "lucid-cardano";


// first page shown to user
// contains search bar and wallet button
const Index = () => {

  // router object
  const router = useRouter();

  // state variables
  const [isLoading, setisLoading] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
    // gets stake address from wallet using cip-30 and lucid
    // @params - the name of the wallet to connect to e.g. 'Nami' or 'Typhon Wallet'
    // @returns - the stake address of the connected wallet
    async function getStakeAddressFromWallet(wallet){
      try{
        // instantiates Lucid - a javascript framework which encapsulates the CIP-30 Dapp Connector
        const lucid = await Lucid.new();

        // api here is set to the requested wallet
        // the user is promted to connect the wallet to the site
        // if the user clicks 'connect', wallet data can be fetched
        var api = '';
    
        if(wallet == 'Typhon Wallet'){
          api = await window.cardano.typhoncip30.enable();
        }
        else if(wallet == 'eternl'){
          api = await window.cardano.eternl.enable();
        }
        else if(wallet == 'Nami'){
          api = await window.cardano.nami.enable();
        }
        else if(wallet == 'Flint Wallet'){
          api = await window.cardano.flint.enable();
        }
        else{
          return null;
        }
        lucid.selectWallet(api);

        // reward address (a.k.a stake address) is fetched from the wallet api
        let stake = await lucid.wallet.rewardAddress();

        return stake;
      }catch(error){
        return null;
      }

    }
  
    // handles the selection of a wallet
    // @params - the name of the wallet to connect to e.g. 'Nami' or 'Typhon Wallet'
    // @returns - the stake address of the connected wallet
    const handleSelect = async (wallet) => {
      setisLoading('fetching');
      setIsVisible(true);
      let stake = await getStakeAddressFromWallet(wallet);

      if(stake!= null){
        router.push(`/wallet/${stake}#wallet`);
      }
      else{
        setisLoading('error');
        setIsVisible(false);
      }
    }

    // loading icon
    // @returns - the loading icon
    if (isLoading === 'fetching') {
      return (
        <div className="loading-symbol" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
          {/* Loading icon component */}
        </div>
      );
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

export default Index;