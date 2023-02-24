import { Lucid } from "lucid-cardano";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WalletButton(stake){

    const [buttonText, setButtonText] = useState('Connect Wallet');
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();



    useEffect(() => {
        function checkStorage(){
            if(stake.stake == null){
            }
            else if(stake.stake != null){
                if(localStorage.getItem(stake.stake)){
                    setButtonText((stake.stake).substring(0,9));
                }
                else if (localStorage.getItem(stake.handle)){
                    setButtonText(stake.handle);
                }
                else{
                    setButtonText((stake.stake).substring(0,9));
                }
            }
            else{
                setButtonText((stake.stake).substring(0,9));
            }

        }
        console.log(stake.stake);
        checkStorage();
    }, [stake])

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
    
      const getAddressFromHandle = async (handle) => {
        let policyID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';
        
        // A blank Handle name should always be ignored.
        if (handle.length === 0) {
          // Handle error.
        }
      
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


    const handleSelect = async (wallet) => {
        setShowDropdown(false);
        let stake = await getStakeAddressFromWallet(wallet);
        router.push(`/${stake}`);
  
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

    function showOptions(){
        setShowDropdown(!showDropdown);
    }

    const refreshWallet = async () => {
        let stakeAddy = '';

        if(stake.stake.startsWith('$')){
            stakeAddy = await getAddressFromHandle(stake.stake.slice(1));
        }
        else{
            stakeAddy = stake.stake;
        }
        localStorage.removeItem(stakeAddy);
        router.reload();
    }

    const disconnectWallet = async () => {
        let stakeAddy = '';
        if(stake.stake.startsWith('$')){
            stakeAddy = await getAddressFromHandle(stake.stake.slice(1));
        }
        else{
        stakeAddy = stake.stake;    
        }

        localStorage.removeItem(stakeAddy);
        router.push('/');
    }


    return(<div className="connect-wallet">
        <button className="connect-wallet-button" onClick={showOptions}>{buttonText}</button>
        { showDropdown && (
            <div className="options">
                <div className="option">
                    <button className="option-button" onClick={() => router.push('/')}>Home ⌂</button>
                </div>
                <div className="option">
                    <button className="option-button" onClick={() => router.push('/'+stake.stake)}>My Wallet</button>
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
            </div>
        )}
        </div>
    );
}