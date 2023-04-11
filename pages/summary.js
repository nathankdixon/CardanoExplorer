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
            setStakePool(stakeInfo[0].delegated_pool);
      
            const mostValuableNft = getMostValuableNft(props.data.nfts);
            if (mostValuableNft) {
              setDisplayedNft(mostValuableNft);
              setNftDisplayText("Most Valuable NFT");
            } else {
              setDisplayedNft(getLargestCollection(props.data.nfts));
              setNftDisplayText("Largest Collection");
            }
      
            const mostValuableFt = getMostValuableFt(props.data.fts);
            if (mostValuableFt) {
              setDisplayedFt(mostValuableFt);
              setFtDisplayText("Most Valuable FT");
            } else {
              setDisplayedFt(getFtWithLargestQuantity(props.data.fts));
              setFtDisplayText("Largest Quantity");
            }
      
            if (props.data.nfts.length > 0) {
              const nftValue = props.data.nfts.reduce(
                (accumulator, element) =>
                  accumulator +
                  (element[0].floor_price
                    ? element[0].floor_price * element.length
                    : 0),
                0
              );
              setNftValue(nftValue);
            }
      
            if (props.data.fts.length > 0) {
              const tokenBalance = getTokenBalance(props.data.fts) * props.currency.value.price;
              setFtValue(tokenBalance);
            }
      
            const adaValue = (stakeInfo[0].total_balance / 1000000) * props.currency.value.price;

            const calculatedTotalValue = ftValue + nftValue + adaValue;
            
            setTotalValue(isNaN(calculatedTotalValue) ? 0 : calculatedTotalValue.toFixed(2));
        
          }
        }
      
        getSummaryInfo();
      }, [props.data, props.currency, ftValue, nftValue, adaBalance, stakePool]);
      


    function getMostValuableNft(nfts){
        let mostValuable = 0;
        let mostValuableNft = null;
        for(const element of nfts){
            let nft = element[0];
            if(nft.floor_price != null){
                if(nft.floor_price > mostValuable){
                    mostValuable = nft.floor_price;
                    mostValuableNft = nft;
                }
            }
        }
        return mostValuableNft;
    }

    function getMostValuableFt(fts){
        let mostValuable = 0;
        let mostValuableFt = null;
        for(const element of fts){
            let ft = element[0];
            if(ft.prices != null){
                if(ft.prices.current*ft.quantity > mostValuable){
                    mostValuable = ft.prices.current*ft.quantity;
                    mostValuableFt = ft;
                }
            }
        }
        return mostValuableFt;
    }

    function getLargestCollection(nfts){
        let largestCollection = 0;
        let largestCollectionNft = null;
        for(const element of nfts){
            let nft = element[0];
            if(element.length > largestCollection){
                largestCollection = element.length;
                largestCollectionNft = nft;
            }
        }
        return largestCollectionNft;
    }

    function getFtWithLargestQuantity(fts){
        let largestQuantity = 0;
        let largestQuantityFt = null;
        for(const element of fts){
            let ft = element[0];
            if(ft.quantity > largestQuantity){
                largestQuantity = ft.quantity;
                largestQuantityFt = ft;
            }
        }
        return largestQuantityFt;
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
      
    // biggest nft collection
    // ada balance
    // tokens 
    // nft
    // fts
    // total value

    return (
        <div className="summary">
            <div className = 'summary-title'>Your Wallet</div>
            <div className="summary-general">
                <div>Stake Address: {props.data.stake}</div>
                <div>ADA Balance: <span style={{color: 'green'}}> {adaBalance} ADA </span></div>
                <div>Total Value: <span className="currency">{props.currency.symbol}</span> {totalValue}</div>
                <div>Pool: {stakePool}</div>
            </div>
            <div className="summary-tokens">
                <div className="summary-tokens-item">
                    <div className="summary-tokens-title">Non-Fungible Tokens</div>
                    <div>Total NFTs:<span style={{color: 'red'}}>{getTotalNfts(props.data.nfts)}</span></div>
                    <div>Unique Policy IDs:<span style={{color: 'yellow'}}>{props.data.nfts.length}</span></div>
                    <div>NFT Value: <span className="currency">{props.currency.symbol}</span> {nftValue}</div>
                    <div className="token-display">{nftDisplayText}<Image src = {displayedNft != null ? displayedNft.ipfs : null} width={100} height={100} alt="nft"/></div>
                </div>
                <div className="summary-tokens-item">
                    <div className="summary-tokens-title">Fungible Tokens</div>
                    <div>Coins:<span style={{color: '#ccffcc'}}>{props.data.fts.length}</span></div>
                    <div>Fungible Token Value:<span className="currency">{props.currency.symbol}</span><span style={{color: 'red'}}>{(ftValue)}</span></div>
                    <div className="token-display">{ftDisplayText}<Image src = {displayedFt != null ? displayedFt.ipfs : null} width={100} height={100} alt="ft"/></div>
                </div>
            </div>
        </div>
    )
}