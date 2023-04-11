import Image from "next/image";
import { useEffect, useState } from "react"

export default function Summary(props){

    const [walletData, setWalletData] = useState({balance: null, total_rewards: null,  available_rewards: null, projects: null, tokens: null, nfts: null, fts:null});

    // current selected currency
    const [currency, setCurrency] = useState({name: 'ADA', value: {price: 1, change24hr: 0}, symbol: '₳'})

    // ada balance
    const [adaBalance, setAdaBalance] = useState();

    const [ftValue, setFtValue] = useState(0);
    const [nftValue, setNftValue] = useState(0);


    const [stakeInfo, setStakeInfo] = useState('Summary');
    const [value, setValue] = useState(0);

    useEffect(() => {
        const getSummaryInfo = async () => {
            if(props.data.stake != null && props.currency  != null){
                let stakeInfo = await getStakeInfo(props.data.stake);

                let totalValue = 0;

                if(props.data.nfts.length > 0){

                    for(const element of props.data.nfts){

                        let nft = element[0];

                        if(nft.floor_price != null){
                            totalValue += nft.floor_price * element.length;
                        }
                    }
                    setNftValue(totalValue);
                }

                if(props.data.fts.length > 0){

                    let tokenBalance = getTokenBalance(props.data.fts);
                    tokenBalance = tokenBalance * props.currency.value.price;
                    setFtValue(tokenBalance);
                }

            }
        }   
        getSummaryInfo();
    },[props.data, currency])

    useEffect(() => {
        if(props.currency != null){
            setCurrency(props.currency);
        }
    }, [props.currency])


    // returns estimated total value of fungible tokens from coingecko prices in ADA
    function getTokenBalance(fts){
        let total = 0;
        for(const element of fts){

            let token = element[0];
            if(token.prices != null){
                total += token.prices.current * token.quantity;
            }
        }
        return total;
    }

    // requests account info from stake address from koios api -- ada balance used
    async function getStakeInfo(stakeAddress){
        try{
            const req = await fetch('https://api.koios.rest/api/v0/account_info', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "_stake_addresses": [
                    stakeAddress
                  ]
                })
              });
          
          const res = await req.json();
            return res;
        }catch(error){
            return null;
        }
    }
    // biggest nft collection
    // ada balance
    // tokens 
    // nft
    // fts
    // total value

    return (
        <div className="summary">
            <h1 className = 'summary-title'>Your Wallet</h1>
            <div>ADA Balance: <span style={{color: 'green'}}> {adaBalance} ADA </span></div>
            <div>NFT Value: <span className="currency">{currency.symbol}</span> {nftValue}</div>
            <div>Fungible Token Value:<span className="currency">{currency.symbol}</span><span style={{color: 'red'}}>{(ftValue)}</span></div>
            <div>NFTs:<span style={{color: 'yellow'}}>{props.data.nfts.length}</span></div>
            <div>Coins:<span style={{color: '#ccffcc'}}>{props.data.fts.length}</span></div>
            <div className="total-value">Total Value: <span className="currency">{currency.symbol}</span> {nftValue + ftValue}</div>
        </div>
    )
}