import Image from "next/image";
import { useEffect, useState } from "react"

export default function Summary(props){

    const [walletData, setWalletData] = useState({balance: null, total_rewards: null,  available_rewards: null, projects: null, tokens: null, nfts: null, fts:null});

    // current selected currency
    const [currency, setCurrency] = useState({name: 'ADA', value: {price: 1, change24hr: 0}, symbol: '₳'})

    // ada balance
    const [adaBalance, setAdaBalance] = useState();

    // total wallet value = ada value + tokens value
    const [totalValue, setTotalValue] = useState();

    const [topToken, setTopToken] = useState({asset_name: 'temptoken', ipfs: '/black.jpeg', onchain_metadata:{name:''}, floor_price: 0});
    const [topCoin, setTopCoin] = useState({asset_name: 'tempcoin', ipfs: '/black.jpeg', metadata:{name:''}, floor_price: 0});
    const [tokenBalance, setTokenBalance] = useState();

    const [stakeInfo, setStakeInfo] = useState('Summary');
    const [value, setValue] = useState(0);
    const [topFp, setTopFp] = useState(0);
    const [topValue, setTopValue] = useState(0);

    

    useEffect(() => {
        const getSummaryInfo = async () => {
            if(props.data.stake != null && props.currency  != null){
                let stakeInfo = await getStakeInfo(props.data.stake);
                let tokenBalance = getTokenBalance(props.data.fts);


                if(props.data.nfts.length > 0){
                    let topToken = props.data.nfts[0][0];
                    let cnftData = await getCnftAssetData(topToken.policy_id);
                    let topFP = cnftData.floor_price/1000000 * props.currency.value.price;
                    let topValue = topFP * props.data.nfts[0].length;
                    setTopFp(topFP);
                    setTopValue(topValue.toFixed(2));

                    setTopToken(topToken);
                }

                if(props.data.fts.length > 0){
                    let topCoin = props.data.fts[0][0];
                    setTopCoin(topCoin);
                }







                if(stakeInfo != null && props.currency.value.price != null){
                    let adaBalance = stakeInfo[0].total_balance/1000000;
                    let value = (adaBalance + tokenBalance) * props.currency.value.price;
                    console.log(adaBalance +' + '+ tokenBalance);
                    setAdaBalance(adaBalance.toFixed(2));
                    setTokenBalance((tokenBalance * props.currency.value.price).toFixed(2));
                    setValue(value.toFixed(2));
                    setStakeInfo(stakeInfo);

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

    async function getCnftAssetData(asset){
        try{
          const data = await fetch('https://api.opencnft.io/1/policy/'+asset,
          {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
          const res = await data.json();
          if(data.status!= 200){
            return null;
          }
          return res;
        }catch(error){
          return null;
        }
      }


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
            <h1 className = 'title'>Your Wallet</h1>
            <table className="stake-info">
                <tbody>
                    <tr className="stake-info-item"><td>ADA Balance: </td><td><span style={{color: 'green'}}> {adaBalance} ADA </span></td></tr>
                    <tr className="stake-info-item"><td>Wallet Value: </td><td><span style={{color: 'purple'}}>{value} {currency.symbol}</span></td></tr>
                    <tr className="stake-info-item"><td>Tokens: </td><td><span style={{color: 'purple'}}>{props.data.tokenNumber}</span></td></tr>
                    <tr className="stake-info-item"><td>Token Value:</td><td><span style={{color: 'red'}}>{(tokenBalance)} {currency.symbol}</span></td></tr>
                    <tr className="stake-info-item"><td>NFTs:</td><td><span style={{color: 'yellow'}}>{props.data.nfts.length}</span></td></tr>
                    <tr className="stake-info-item"><td>Coins:</td><td><span style={{color: '#ccffcc'}}>{props.data.fts.length}</span></td></tr>
                </tbody>
            </table>
            <div className="preview-img-item" >Largest NFT Collection<Image className='preview-img' src={topToken.ipfs} width={200} height={200} alt={topToken.asset_name}/>{topToken.onchain_metadata.name}</div>
            <div className="preview-img-item">Value: {topValue} {currency.symbol}</div>
            <div className="preview-img-item">Most Valuable Coin <Image className='preview-img' src={topCoin.ipfs} width={200} height={200} alt={topCoin.asset_name}/>{topCoin.metadata.name} </div>
        </div>
    )
}