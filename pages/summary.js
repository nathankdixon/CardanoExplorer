import Image from "next/image";
import { useEffect, useState } from "react"

export default function Summary(props){

    const [walletData, setWalletData] = useState({balance: null, total_rewards: null,  available_rewards: null, projects: null, tokens: null, nfts: null, fts:null});

    // current selected currency
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'})

    // ada balance
    const [adaBalance, setAdaBalance] = useState();

    // total wallet value = ada value + tokens value
    const [totalValue, setTotalValue] = useState();

    const [stakeInformation, setStakeInformation] = useState('Summary');
    const [poolInformation, setPoolInformation] = useState('Summary');

    // useEffect(() => {
    //     const getSummaryInfo = async () => {
    //         if(props.data.stake != null){

    //             // stake address from wallet.js
    //             let stakeAddress = props.data.stake;

    //             // fetches ada balance contained in stake
    //             let adaBalance = await getAccountBalance(stakeAddress);

    //             if(adaBalance != null){


    //                 // set summary info
    //                 setWalletData({balance: adaBalance, projects: props.data.projectNumber, 
    //                     tokens: props.data.tokenNumber, nfts: props.data.nfts.length, fts: props.data.fts.length})


    //                 // ada price and currency data from prices component
    //                 // sets ada value and total wallet value based on coin gecko prices
    //                 if(props.prices != null){
    //                     // used for current currency symbol display
    //                     setCurrency(props.prices.currency);

    //                     // all price data from prices component
    //                     let prices = props.prices;

    //                     // current currency ada valuation
    //                     let currency = props.prices.currency.value;

    //                     // balance is returned in 'lovelace' - 1 ada = 1000000 lovelaces
    //                     let _balance = adaBalance/1000000;

    //                     // value of ada -- current currency value * quantity of ada
    //                     // e.g., ada/usd = $0.4 * 100 ada = $40 ada value
    //                     let value = (currency*_balance);

    //                     // gets total ADA valuation of all fungible tokens (supported by coin gecko)
    //                     let tokenBalance = getTokenBalance(props.tokens.fts);

    //                     // total value of tokens and ada combined -- wallet value
    //                     // converted by selectede currency -- defaults to ADA
    //                     let totalValue = (currency * (tokenBalance +value));
   
    //                     // if privacy option is selected
    //                     // convert all values to '*' encoding to hide sensitive information
    //                     if(prices.privacy){
                            
    //                         // ada balance value
    //                         let adaValueNum = (value.toFixed(2)).toString();

    //                         // total wallet value = ada value + token values
    //                         let totalValueNum = (totalValue.toFixed(2)).toString();

    //                         // asterisk encoding
    //                         let adaAsterisks = "*".repeat(adaValueNum.length);
    //                         let tokenAsterisks = "*".repeat(totalValueNum.length);
    //                         setAdaBalance(adaAsterisks);
    //                         setTotalValue(tokenAsterisks);
    //                     }
    //                     else{
    //                        setAdaBalance(value.toFixed(2));
    //                        setTotalValue(totalValue.toFixed(2));
    //                     }
   
    //                 }
    //             }
    //         }
    //     }
    //     getSummaryInfo();
    // },[props])

    

    useEffect(() => {
        const getSummaryInfo = async () => {
            if(props.data.stake != null){

                let stakeInfo = await getStakeInfo(props.data.stake);
                let tokenBalance = getTokenBalance(props.data.fts);

                setStakeInformation(
                    <table className="stake-info">
                        <tbody>
                            <tr className="stake-info-item"><td>Balance: </td><td><span style={{color: 'green'}}> {(stakeInfo.balance/1000000).toFixed(2)} ADA </span></td></tr>
                            <tr className="stake-info-item"><td>Tokens: </td><td><span style={{color: 'purple'}}>{props.data.tokenNumber}</span></td></tr>
                            <tr className="stake-info-item"><td>NFTs:</td><td><span style={{color: 'orange'}}>{props.data.nfts.length}</span></td></tr>
                            <tr className="stake-info-item"><td>Coins:</td><td><span style={{color: '#ccffcc'}}>{props.data.fts.length}</span></td></tr>
                            <tr className="stake-info-item"><td>Token Balance:</td><td><span style={{color: 'red'}}>{(tokenBalance).toFixed(2)} ADA</span></td></tr>
                            <tr className="stake-info-item"><td>Total Rewards:</td><td><span style={{color: 'blue'}}>{(stakeInfo.rewards)/1000000} ADA</span></td></tr>
                            <tr className="stake-info-item"><td>Available Rewards:</td><td><span style={{color: 'blue'}}>{(stakeInfo.availableRewards)/1000000} ADA</span></td></tr>
                            <tr className="stake-info-item"><td>top coin, top collection, last 5 nft txs, </td><td><span style={{color: 'blue'}}></span></td></tr>
                        </tbody>
                  </table>
                );
                
            }
        }   
        getSummaryInfo();
    },[props.data])


    // returns estimated total value of fungible tokens from coingecko prices in ADA
    function getTokenBalance(fts){
        let total = 0;
        for(const element of fts){

            let token = element[0];

            if(token.prices != null && token.prices.current != null){
                // convert from usd prices to ADA -- default app currency
                let price = token.prices.current;
                let value = 0;
                if(price != -1){
                    value = (price)* (token.quantity/1000000);
                }
                total = total + value;
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

          let pool = res[0].delegated_pool;
          let rewards = res[0].rewards;
          let availableRewards = res[0].rewards_available;
          let balance = res[0].total_balance;
          return {pool: pool, rewards: rewards, availableRewards: availableRewards, balance: balance};
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
        <div className="summary"><h1>Wallet Summary</h1>
            <div className="stake-information">{stakeInformation}</div>
        </div>
    )
}