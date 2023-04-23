import Image from "next/image";
import { useEffect, useState } from "react"

export default function Summary(props){

    // current selected currency

    // ada balance
    const [adaBalance, setAdaBalance] = useState(0);
    const [stakePool, setStakePool] = useState(null);

    const [totalValue, setTotalValue] = useState(0);
    const [nftValue, setNftValue] = useState(0);
    const [tokenValue, setTokenValue] = useState(0);
    const [nftsDisplay, setNftsDisplay] = useState([]);
    const [ftsDisplay, setFtsDisplay] = useState([]);

    useEffect(() => {
        async function getSummaryInfo() {
          if (props.data.stake && props.currency.value.price) {
            let stakeInfo = await getStakeInfo(props.data.stake);
            if(stakeInfo[0].total_balance == null){
              setAdaBalance(0);
            }
            else{
              setAdaBalance((stakeInfo[0].total_balance / 1000000).toFixed(2));

            }
            let pool = await getPoolInfo(stakeInfo[0].delegated_pool);
            
            setStakePool(pool);
            console.log(props.currency)

            // get total value of fungible tokens
            let tokenBalance = getTokenBalance(props.data.fts) * props.currency.value.price;
            setTokenValue((tokenBalance).toFixed(2));

            //get total value of nfts
            let nftBalance = getNftValue(props.data.nfts) * props.currency.value.price;
            setNftValue(nftBalance.toFixed(2));

            let adaBalanceCurrency = adaBalance * props.currency.value.price;

            let total = adaBalanceCurrency + tokenBalance + nftBalance;
            setTotalValue(total.toFixed(2));


            // get top 5 nfts by value
            let sortedNfts = [...props.data.nfts].sort((a, b) => {
              const aHasPrice = a[0].floor_price !== null;
              const bHasPrice = b[0].floor_price !== null;

              if (aHasPrice && bHasPrice) {
                const aValue = a[0].floor_price;
                const bValue = b[0].floor_price;
                return bValue - aValue;
              } else if (aHasPrice) {
                return -1;
              } else if (bHasPrice) {
                return 1;
              } else {
                return 0;
              }
              
            });

            // get top 5 coins by value
            let sortedFts = [...props.data.fts].sort((a, b) => {
              const aHasPrice = a[0].prices !== null;
              const bHasPrice = b[0].prices !== null;

              if (aHasPrice && bHasPrice) {
                const aValue = a[0].prices.current * a[0].quantity;
                const bValue = b[0].prices.current * b[0].quantity;
                return bValue - aValue;
              }
              else if (aHasPrice) {
                return -1;
              }
            });

            let topNfts = sortedNfts.slice(0, 5);
            let topFts = sortedFts.slice(0, 5);

            let top5Nfts = [];
            let top5Fts = [];

            for(const element of topNfts){
              for(let i =0; i<element.length; i++){
                top5Nfts.push(element[i]);
              }
            }

            for(const element of topFts){
              for(let i = 0; i<element.length; i++){
                top5Fts.push(element[i]);
              }
            }

            top5Nfts = top5Nfts.slice(0, 3);
            top5Fts = top5Fts.slice(0, 3);

            let nftsDisplay = [];
            let ftsDisplay = [];


            for(const nft of top5Nfts){
              let value = nft.floor_price * props.currency.value.price;
              if(nft.floor_price != null){
                value = value.toFixed(2);
                nftsDisplay.push(<div className="summary-display-item" key={nft.asset_name+'nfts'}>
                <Image src={nft.ipfs} width={150} height={150} alt={nft.decoded_name} className="display-item" quality={10}   loading="eager"/>
                <div className="display-item"><span className="currency">{props.currency.symbol}</span>{value}</div></div>);
              }
            }

            for(const ft of top5Fts){
              let value = ft.prices?.current * ft.quantity * props.currency.value.price;
              if(!isNaN(value)){
                value = value.toFixed(2);
                ftsDisplay.push(<div className="summary-display-item" key={ft.asset_name + 'fts'}>
                <Image src={ft.ipfs} width={150} height={150} alt={ft.decoded_name} className="display-item" quality={10}   loading="eager"/>
                <div className="display-item"><span className="currency">{props.currency.symbol}</span>{value}</div>
                </div>);
              }

            }

            setNftsDisplay(nftsDisplay);
            setFtsDisplay(ftsDisplay);


          }
        }
      
        getSummaryInfo();
      }, [props.data, props.currency]);

    
    
    function getNftValue(nfts){
      let total = 0;
      for(const element of nfts){
        for(const nft of element){
          if(nft.floor_price != null){
            total += nft.floor_price;
          }
        }
      }
      return total;
    }
    
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
        let ticker = res[0].meta_json.ticker;
        return ticker;
      }catch(error){
        return '-';
      }
    }

    return (
        <div className="summary">
            <div className = 'summary-title'>Your Wallet</div>
            <div className="summary-general">
            <div className="summary-general-title">Wallet Summary</div>
                <div className="summary-general-item">Stake Address: {props.data.stake}</div>
                <div className="summary-general-container">
                  <div className="summary-general-item">ADA Balance: <span style={{color: '#90EE90'}}> {adaBalance} ADA </span></div>
                  <div className="summary-general-item">Custom Tokens: {getTotalNfts(props.data.nfts) + props.data.fts.length}</div>
                  <div className="summary-general-item">Wallet Value: <span className="currency">{props.currency.symbol}</span><span style={{color: '#90EE90'}}>{totalValue}</span></div>
                  <div className="summary-general-item">Delegated Stake Pool: <span style={{color: "yellow"}}>{stakePool}</span></div>
                </div>
            </div>
            <div className="summary-tokens">
                <div className="summary-tokens-item">
                    <div className="summary-tokens-title">Non-Fungible Tokens</div>
                    <div className="summary-tokens-text"><div>NFTs:</div><div><span style={{color: 'yellow'}}>{getTotalNfts(props.data.nfts)}</span></div></div>
                    <div className="summary-tokens-text"><div>Unique Policy IDs:</div><div><span style={{color: 'yellow'}}>{props.data.nfts.length}</span></div></div>
                    <div className="summary-tokens-text"><div>Total Value of NFTs:</div><div><span className="currency">{props.currency.symbol}</span> <span style={{color: '#90EE90'}}>{nftValue}</span></div></div>
                    <div className="summary-tokens-title" style={{textAlign: "center"}}>Top 3 NFTs by Value</div>
                    <div className="summary-display">{nftsDisplay}</div>
                </div>
                <div className="summary-tokens-item">
                    <div className="summary-tokens-title">Fungible Tokens</div>
                    <div className="summary-tokens-text">Coins:<span style={{color: 'yellow'}}>{props.data.fts.length}</span></div>
                    <div className="summary-tokens-text">Total Coin Value:<div><span className="currency">{props.currency.symbol}</span><span style={{color: '#90EE90'}}>{tokenValue}</span></div></div>
                    <div className="summary-tokens-title" style={{textAlign: "center"}}>Top 3 Coins by Value</div>
                    <div className="summary-display">{ftsDisplay}</div>
                </div>
            </div>
        </div>
    )
}