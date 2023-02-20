import { stakeCredentialOf } from "lucid-cardano";
import { useEffect, useState } from "react";
import Fts from "./fts";
import Nfts from "./nfts";
import Prices from "./prices";
import Summary from "./summary";

export default function Tokens ({tokens}) {

    const [prices, setPrices] = useState();
    const [showNfts, setShowNfts] = useState(false);

    function setPriceData(data){
        setPrices(data);
    }

    function displayNfts(){
        setShowNfts(true);
    }

    function displayFts(){
        setShowNfts(false);
    }


    
    return (
        <div className="wallet">
            <Prices data ={setPriceData}/>
            <Summary tokens = {tokens} prices = {prices}/>
             <nav>
                <div>
                    <button className="setting-button" onClick={displayNfts}>NFTs</button>
                    <button className="setting-button" onClick={displayFts}>FTs</button>
                </div>
                <div>
                    <button className="setting-button" >Search</button>
                </div>
                <div>
                    <button className="setting-button">Filter</button>
                    <button className="setting-label">Quantity</button>
                    <button className="setting-label">Alphabetically</button>
                </div>
             </nav>
             {showNfts ? <Nfts tokens = {tokens} /> : <Fts tokens = {tokens} prices = {prices}/>}
        </div>
    )
}