import { useEffect, useState } from "react"

export default function Summary(props){

    const [walletData, setWalletData] = useState({balance: null, total_rewards: null,  available_rewards: null, projects: null, tokens: null, nfts: null, fts:null});

    // current selected currency
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'})

    // ada balance
    const [adaBalance, setAdaBalance] = useState();

    // total wallet value = ada value + tokens value
    const [totalValue, setTotalValue] = useState();

    useEffect(() => {
        const getSummaryInfo = async () => {
            if(props.tokens.stake != null){

                // stake address from wallet.js
                let stakeAddress = props.tokens.stake;

                // fetches json account info of stake address
                let stakeInfo = await getAccountInfoFromKoios(stakeAddress);

                if(stakeInfo != null){

                    // takes ada balance from stake address info
                    let ada_balance = stakeInfo[0].total_balance;

                    // set summary info
                    setWalletData({balance: ada_balance, projects: props.tokens.projectNumber, 
                        tokens: props.tokens.tokenNumber, nfts: props.tokens.nfts.length, fts: props.tokens.fts.length})


                    // ada price and currency data from prices component
                    // sets ada value and total wallet value based on coin gecko prices
                    if(props.prices != null){
                        // used for current currency symbol display
                        setCurrency(props.prices.currency);

                        // all price data from prices component
                        let prices = props.prices;

                        // current currency ada valuation
                        let currency = props.prices.currency.value;

                        // balance is returned in 'lovelace' - 1 ada = 1000000 lovelaces
                        let _balance = ada_balance/1000000;

                        // value of ada -- current currency value * quantity of ada
                        // e.g., ada/usd = $0.4 * 100 ada = $40 ada value
                        let value = (currency*_balance);

                        // gets total ADA valuation of all fungible tokens (supported by coin gecko)
                        let tokenBalance = getTokenBalance(props.tokens.fts);

                        // total value of tokens and ada combined -- wallet value
                        // converted by selectede currency -- defaults to ADA
                        let totalValue = (currency * (tokenBalance +value));
   
                        // if privacy option is selected
                        // convert all values to '*' encoding to hide sensitive information
                        if(prices.privacy){
                            
                            // ada balance value
                            let adaValueNum = (value.toFixed(2)).toString();

                            // total wallet value = ada value + token values
                            let totalValueNum = (totalValue.toFixed(2)).toString();

                            // asterisk encoding
                            let adaAsterisks = "*".repeat(adaValueNum.length);
                            let tokenAsterisks = "*".repeat(totalValueNum.length);
                            setAdaBalance(adaAsterisks);
                            setTotalValue(tokenAsterisks);
                        }
                        else{
                           setAdaBalance(value.toFixed(2));
                           setTotalValue(totalValue.toFixed(2));
                        }
   
                    }
                }
            }
        }
        getSummaryInfo();
    },[props])

    // returns estimated total value of fungible tokens from coingecko prices in ADA
    function getTokenBalance(fts){
        let total = 0;
        for(const element of fts){

            let token = element[0];
            if(token.current != -1){
                // convert from usd prices to ADA -- default app currency
                let price = token.current * (1/props.prices.adaUSD);
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
    async function getAccountInfoFromKoios(stakeAddress){
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

    return (
        <div className="summary">
            <div className="summary-item">
                Ada Value: <div className="value"><div className="currency">{currency.symbol}</div> {adaBalance}</div>
            </div>
            <div className="summary-item">
                Wallet Value: <div className="value"><div className="currency">{currency.symbol}</div> {totalValue}</div>
            </div>
            <div className="summary-item">
                Tokens:<div className="value">{walletData.tokens}</div>
            </div>
            <div className="summary-item">
                Projects:<div className="value"> {walletData.projects}</div>
            </div>
            <div className="summary-item">
                NFTs:<div className="value"> {walletData.nfts}</div>
            </div>
            <div className="summary-item">
                FTs:<div className="value"> {walletData.fts}</div>
            </div>
        </div>
    )
}