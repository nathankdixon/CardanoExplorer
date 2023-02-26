import { Lucid } from "lucid-cardano";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ColorPicker from "./colorPicker";

export default function WalletButton(props){

    const [buttonText, setButtonText] = useState('Connect Wallet');
    const [showDropdown, setShowDropdown] = useState(false);
    const [colors, setColors] = useState();

    const router = useRouter();


    // checks browser local storage for wallet data of key : stake on each page load.
    // used to pass stake address to
    useEffect(() => {
        function checkStorage(){
            if(props.stake == null){
                //base case
            }
            else{
                // stake = router query
                // stake.stake = query as string
                // button text to identify wallet
                setButtonText((props.stake).substring(0,9));
            }
        }
        checkStorage();
    }, [props])

    async function getStakeFromAddressKoios(address){
        // returns stake address from base address
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
    
      const getAddressFromHandle = async (handle) => {
        // code from ada handle webnsite
        // uses blockfrost to get address of handle location

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
            
            let stake = await getStakeFromAddressKoios(data[0].address);
            return stake;
        }
      }

    const handleSelect = async (wallet) => {
        // used to show dropdown options list 
        setShowDropdown(false);
        let stake = await getStakeAddressFromWallet(wallet);
        router.push(`/${stake}`);
  
    }

    async function getStakeAddressFromWallet(wallet){

        // connects to wallet using cip-30 
        // uses lucid to get return address
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

    function showOptions(){
        setShowDropdown(!showDropdown);
    }

    const refreshWallet = async () => {

        // removes stake data from local storage
        // refreshes page
         // loads new token data from blockfrost /koios
        let stakeAdd = '';

        if(stake.stake.startsWith('$')){
            stakeAdd = await getAddressFromHandle(props.stake.slice(1));
        }
        else{
            stakeAdd = props.stake;
        }
        if(stakeAddy != null){
            localStorage.removeItem(stakeAdd);
            router.reload();
        }
        else{
            //r refresh error
        }
    }

    const disconnectWallet = async () => {

        // removes stake data from local storage
        // routes to start page
        let stakeAdd = '';
        if(stake.stake.startsWith('$')){
            stakeAdd = await getAddressFromHandle(props.stake.slice(1));

        }
        else{
            stakeAdd = props.stake;
        }

        if(stakeAdd != null){
            localStorage.removeItem(stakeAdd);
            router.push('/');
        }
        else{
            // disconnect  error
        }
    }

    function setColorData(data){
        setColors(data);
    }

    // need options to still be present but hidden so color picker will work
    return(<div className="connect-wallet">
        <button className="connect-wallet-button" onClick={showOptions}>{buttonText}</button>
        { showDropdown && (
            <div className="options">
                <div className="option">
                    <button className="option-button" onClick={() => router.push('/'+stake.stake)}>My Wallet ⌂</button>
                </div>
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
                <div className="option">
                </div>
            </div>
        )}
                <ColorPicker data={setColorData} stake={props}/>

        </div>
    );
}