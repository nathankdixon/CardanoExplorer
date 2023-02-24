import { useEffect, useState } from "react"

export default function Summary(props){

    const [walletData, setWalletData] = useState({balance: null, total_rewards: null,  available_rewards: null, projects: null, tokens: null, nfts: null, fts:null});
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'})
    const [adaBalance, setAdaBalance] = useState();
    const [totalValue, setTotalValue] = useState();

    useEffect(() => {
        const getBalance = async () => {
            if(props.tokens.stake != null){
                let stakeAddress = props.tokens.stake;
                let stakeData = await getAccountInfoFromKoios(stakeAddress);
                setWalletData({balance: stakeData[0].total_balance, projects: props.tokens.projectNumber, 
                     tokens: props.tokens.tokenNumber, nfts: props.tokens.nfts.length, fts: props.tokens.fts.length})
                if(props.prices != null){
                    setCurrency(props.prices.currency);
                    let prices = props.prices;
                    let currency = props.prices.currency.value;
                    let _balance = stakeData[0].total_balance/1000000;
                    let value = (currency*_balance);

                    let tokenBalance = getTokenBalance(props.tokens.fts);
                    let totalValue = (currency * (tokenBalance +value));

                    if(prices.privacy == true){

                        let adaValueNum = (value.toFixed(2)).toString();
                        let totalValueNum = (totalValue.toFixed(2)).toString();
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
        getBalance();
    },[props])

    function getTokenBalance(fts){
        let total = 0;
        for(const element of fts){

            let token = element[0];
            if(token.current != -1){
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

    async function getAccountInfoFromKoios(stakeAddress){
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