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

    return (<div>
                <header className="home-header">
                    <label className="main-label">✥ Explorer</label>
                    <SearchBar/>
                    <WalletButton/>
                </header>
                <Prices data={setPriceData}/>
                <Blocks />
            </div>)
}