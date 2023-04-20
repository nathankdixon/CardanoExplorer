import { Lucid } from "lucid-cardano";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// button which connects to a wallet
//  - displays the stake address of the connected wallet
// loads any local storage data linked to stake address
export default function WalletButton(props){

    const [buttonText, setButtonText] = useState('Wallet') ;
    const [isVisable, setIsVisable] = useState(false);

    const router = useRouter();

    // sets the button text to the stake address of the connected wallet
    // stake address is passed in url or as query => stake={stake

    // this method fetches the stake address for any given base address.
    // it uses a Blockfrost API which returns data for specific addresses.

    // @param - a base address, containing the stake key for its wallet.
    // @return a stake address, an account address which can be used to fetch data for its corresponding wallet.

    // used to connect to wallet
    const handleSelect = async (wallet) => {
        hideMenu();
        // used to show dropdown options list 
        let stake = await getStakeAddressFromWallet(wallet);
        if(stake != null){
            router.push(`/${stake}`);
        }
        else{
            console.log('wallet error');
        }
  
    }

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

    const disconnectWallet = async () => {
        // removes stake data from local storage
        // routes to start page
        hideMenu();
        let stake = '';
        localStorage.clear();
    }


    // used to show dropdown options list
    function showMenu(){
        setIsVisable(true);
    }

    function hideMenu(){
        setIsVisable(false);
    }

    function toggleMenu(){
        if(isVisable){
            hideMenu();
        }
        else{
            showMenu();
        }
    }


    // need options to still be present but hidden so color picker will work
    return(<div className="connect-wallet" onClick={() => toggleMenu()} >
        <button className="connect-wallet-button"><Image src={'/wallet.svg'} width={30} height={30} alt='no-img' className='wallet-img'/>
        <div className="wallet-button-text">{buttonText}</div></button>
        <div className="dropdown" style={{display: isVisable ? 'block' : 'none'}} >
        <div className="option">
                    <button className="option-button" onClick={() => handleSelect('Typhon Wallet')}>Typhon<img className = 'connect-wallet-img' src="/typhon.svg"></img></button>
                </div>
                <div className="option">
                    <button className="option-button" onClick={() => handleSelect('eternl')}>Eternl<img className = 'connect-wallet-img' src = '/eternl.png'></img></button>
                </div>
                <div className="option">
                    <button className="option-button" onClick={() => handleSelect('Nami')}>Nami<img className="connect-wallet-img" src="/nami.svg"></img></button>
                </div>
                <div className="option">
                    <button className="option-button" onClick={() => handleSelect('Flint Wallet')}>Flint<img className="connect-wallet-img" src="/flint.png"></img></button>
                </div>
                <div className="option">
                    <button className="option-button" onClick={() => disconnectWallet()}>✗ Disconnect</button>
                </div>
        </div>
    </div>
    );
}