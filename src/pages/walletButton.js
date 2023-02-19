import { Lucid } from "lucid-cardano";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WalletButton(stake){

    const [buttonText, setButtonText] = useState('Connect Wallet');
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();


    useEffect(() => {
        function checkStorage(){
            if(stake.stake == undefined){
            }
            else if(stake.stake != null){
                if(localStorage.getItem(stake.stake)){
                    setButtonText((stake.stake).substring(0,9));
                }
            }
            else{
                setButtonText((stake.stake).substring(0,9));
            }

        }
        checkStorage();
    }, [stake])


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

    const refreshWallet = () => {
        localStorage.removeItem(stake.stake);
        router.reload();
    }

    const disconnectWallet = () => {
        localStorage.removeItem(stake.stake);
        router.push('/');
    }


    return(<div className="connect-wallet">
        <button className="connect-wallet-button" onClick={showOptions}>{buttonText}</button>
        { showDropdown && (
            <div className="options">
                <button className="option" onClick={() => handleSelect('Typhon Wallet')}><img className = 'connect-wallet-img' src="/typhon.svg"></img>Typhon</button>
                <button className="option" onClick={() => handleSelect('eternl')}><img className = 'connect-wallet-img' src = '/eternl.png'></img>Eternl</button>
                <button className="option" onClick={() => handleSelect('Nami')}><img className="connect-wallet-img" src="/nami.svg"></img>Nami</button>
                <button className="option" onClick={() => handleSelect('Flint Wallet')}><img className="connect-wallet-img" src="/flint.png"></img> Flint</button>
                <button className="option" onClick={() => refreshWallet()}>↺ Refresh</button>
                <button className="option" onClick={() => disconnectWallet()}>✗ Disconnect</button>
            </div>
        )}
        </div>
    );
}