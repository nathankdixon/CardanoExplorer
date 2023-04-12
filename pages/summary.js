import Image from "next/image";
import { useEffect, useState } from "react"

export default function Summary(props){

    // current selected currency
    const [currency, setCurrency] = useState({name: 'ADA', value: {price: 1, change24hr: 0}, symbol: '₳'})

    // ada balance
    const [adaBalance, setAdaBalance] = useState(0);
    const [stakePool, setStakePool] = useState(null);

    const [ftValue, setFtValue] = useState(0);
    const [nftValue, setNftValue] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    const [displayedNft, setDisplayedNft] = useState({ipfs: '/black.jpeg', name: ''});

    const [displayedFt, setDisplayedFt] = useState({ipfs: '/black.jpeg', name: ''});

    const [nftDisplayText, setNftDisplayText] = useState('');
    const [ftDisplayText, setFtDisplayText] = useState('');

    useEffect(() => {
        async function getSummaryInfo() {
          if (props.data.stake && props.currency) {
            let stakeInfo = await getStakeInfo(props.data.stake);
            setAdaBalance(stakeInfo[0].total_balance / 1000000);
            let pool = await getPoolInfo(stakeInfo[0].delegated_pool);
            let poolTicker = pool[0].meta_json.ticker;
            setStakePool(poolTicker);

          }
        }
      
        getSummaryInfo();
      }, [props.data, props.currency]);
    

    // returns estimated total value of fungible tokens from coingecko prices in ADA
    function getTokenBalance(fts){
        let total = 0;
        for(const element of fts){

            let token = element[0];
            if(token.prices?.current != null){
                total += token.prices.current * token.quantity;
            }
        }
        return total;
    }

    function getTotalNfts(nfts){
        let total = 0;
        for(const element of nfts){
            total += element.length;
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


          // requests account info from stake address from koios api -- ada balance used
    async function getPoolInfo(pool){
      try{
        const req = await fetch('https://api.koios.rest/api/v0/pool_info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "_pool_bech32_ids": [
              pool
            ]
          })
        });
    
        const res = await req.json();
        return res;
      }catch(error){
        return null;
      }
    }

    return (
        <div className="summary">
            <div className = 'summary-title'>Your Wallet</div>
            <div className="summary-general">
                <div className="summary-general-item">Stake Address: {props.data.stake}</div>
                <div className="summary-general-container">
                  <div className="summary-general-item">ADA Balance: <span style={{color: 'green'}}> {adaBalance} ADA </span></div>
                  <div className="summary-general-item">Wallet Value: <span className="currency">{props.currency.symbol}</span><span style={{color: 'green'}}>{totalValue}</span></div>
                  <div className="summary-general-item">Delegated Stake Pool: <span style={{color: "orange"}}>{stakePool}</span></div>
                </div>

            </div>
            <div className="summary-tokens">
                <div className="summary-tokens-item">
                    <div className="summary-tokens-title">Non-Fungible Tokens</div>
                    <div className="summary-tokens-text">Total NFTs:<span style={{color: 'red'}}>{getTotalNfts(props.data.nfts)}</span></div>
                    <div className="summary-tokens-text">Unique Policy IDs:<span style={{color: 'yellow'}}>{props.data.nfts.length}</span></div>
                </div>
                <div className="summary-tokens-item">
                    <div className="summary-tokens-title">Fungible Tokens</div>
                    <div className="summary-tokens-text">Coins:<span style={{color: '#ccffcc'}}>{props.data.fts.length}</span></div>
                </div>
            </div>
        </div>
    )
}