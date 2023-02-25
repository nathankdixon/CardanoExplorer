import { useState } from "react";
import Fts from "./fts";
import Nfts from "./nfts";
import Prices from "./prices";
import Summary from "./summary";

export default function Tokens ({tokens}) {

    const [prices, setPrices] = useState();
    const [showNfts, setShowNfts] = useState(false);
    const [nftActive, setNftActive] = useState(false);
    const [ftActive, setFtActive] = useState(true);

    function setPriceData(data){
        setPrices(data);
    }

    function displayNfts(){
        setFtActive(false);
        setNftActive(true);
        setShowNfts(true);
    }

    function displayFts(){
        setNftActive(false);
        setFtActive(true);
        setShowNfts(false);
    }


    
    return (
        <div className="wallet">
            <Prices tokens = {tokens} data ={setPriceData}/>
            <Summary tokens = {tokens} prices = {prices}/>
             <nav className="setting-nav">
                <div>
                    <button className= {nftActive ? 'active' : 'inactive'}  onClick={displayNfts}>NFTs</button>
                    <button className= {ftActive ? 'active' : 'inactive'} onClick={displayFts}>FTs</button>
                </div>
                <div>
                    <button className="setting-button" >Search</button>
                </div>
             </nav>
             {showNfts ? <Nfts tokens = {tokens} /> : <Fts tokens = {tokens} prices = {prices}/>}
        </div>
    )
}