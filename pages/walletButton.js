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
    // stake address is passed in url or as query => stake={stake}
    useEffect(() => {
        async function checkStorage(){
            if(props.stake != null){
                let stake = '';
                if((props.stake).startsWith('$')){
                    stake = await getAddressFromHandle((props.stake).slice(1));
                }
                else{
                    stake = props.stake;
                }
                setStake(stake);
            }
        }
        checkStorage();

    }, [props])

    // this method fetches the stake address for any given base address.
    // it uses a Blockfrost API which returns data for specific addresses.

    // @param - a base address, containing the stake key for its wallet.
    // @return a stake address, an account address which can be used to fetch data for its corresponding wallet
    async function getStakeFromAddress(address){
        try{
            // fetch data relating to address
            const req = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/addresses/'+address, 
            {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});

            // JSON returned contains stake address for given base address.
            const res = await req.json();
            if(res.stake_address != null){
                return res.stake_address;
            }
            else{
                return null;
            }
        }
        catch(error){ 
            // handle error
            return null;
        }
    }
    
      // returns base address from handle
      const getAddressFromHandle = async (handle) => {
        // code from ada handle webnsite
        // uses blockfrost to get address of handle location
        let stake = '';
        // poliuy id of all ADA handles
        let policyID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';
        
        // A blank Handle name should always be ignored.
        if (handle.length === 0) {
            return null;
        }
        else{
            // Convert handleName to hex encoding.
            let assetName = Buffer.from(handle).toString('hex');
        
            const data = await fetch(
            `https://cardano-mainnet.blockfrost.io/api/v0/assets/${policyID}${assetName}/addresses`,
            {
                headers: {
                // Your Blockfrost API key
                project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh',
                'Content-Type': 'application/json'
                }
            }
            ).then(res => res.json());

            if(data[0].address != null){
                stake = await getStakeFromAddress(data[0].address);
                if(stake != null){
                    return stake;
                }
                else{
                    return null;
                }
            }
            else{
                return null;
            }
        }
      }

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

    const refreshWallet = async () => {
        // removes stake data from local storage
        // refreshes page
         // loads new token data from blockfrost /koios
        hideMenu();
        let stake = '';
        if(props.stake.startsWith('$')){
            // if handle
            // fetch stake address from handle
            stake = await getAddressFromHandle(props.stake.slice(1));

            if(stake != null){
                // remove stake data from local storage
                localStorage.removeItem(stake);
                // refresh page
                router.reload();
            }
            else{
                localStorage.removeItem(props.stake);
                router.reload();
            }
        }
        else{
            // is stake address
            stake = props.stake;
        }
        if(stake != null){
            // remove stake data from local storage
            localStorage.removeItem(stake);
            // refresh page
            router.reload();
        }
        else{
            //r refresh error
        }
    }

    const disconnectWallet = async () => {
        // removes stake data from local storage
        // routes to start page
        hideMenu();
        let stake = '';
        if(props.stake.startsWith('$')){
            // if handle fetch stake address from handle
            stake = await getAddressFromHandle(props.stake.slice(1));

            if(stake != null){
                // remove stake data from local storage
                localStorage.removeItem(stake);
                // route to start page
                router.push('/');
            }
            else{
                localStorage.removeItem(props.stake);
                router.push('/');
            }
        }
        else{
            // is stake address
            stake = props.stake;
        }

        if(stake != null){
            // remove stake data from local storage
            localStorage.removeItem(stake);

            // route to start page
            router.push('/');
        }
        else{
            // disconnect  error
        }
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
                    <button className="option-button" onClick={() => refreshWallet()}>↺ Refresh</button>
                </div>
                <div className="option">
                    <button className="option-button" onClick={() => disconnectWallet()}>✗ Disconnect</button>
                </div>
        </div>
    </div>
    );
}