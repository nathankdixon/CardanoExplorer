import { useEffect, useState } from "react";
import Blocks from "./blocks";
import Prices from "./prices";
import SearchBar from "./searchbar";
import WalletButton from "./walletButton";

export default function Home(props){

    const [isLoading, setisLoading] = useState(null);
    const [prices, setPrices] = useState(null);

    useEffect(() => {
        if(props.data != null){
            setisLoading('loaded');
        }
        else{
            setisLoading('loading');
        }
    },[props.data])

    function setPriceData (data){
        setPrices(data);
    }

    function deleteLocalStorage(){
        localStorage.removeItem(props.data.stake);
        window.location.reload();
    }

    return (<div>
                <header className="home-header">
                    <label className="main-label">✥ Explorer</label>
                    <SearchBar/>
                    <WalletButton/>
                </header>
                <div className="home-body">
                    <Prices data={setPriceData}/>
                    <Blocks />
                    <button onClick={deleteLocalStorage} className="option-button">Refresh Wallet</button>
                </div>
            </div>)
}