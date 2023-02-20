import { useEffect, useState } from "react"

export default function Summary(props){

    const [walletData, setWalletData] = useState({balance: null, total_rewards: null,  available_rewards: null, projects: null, tokens: null, nfts: null, fts:null});
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'})
    const [adaBalance, setAdaBalance] = useState();
    const [tokenBalance, setTokenBalance] = useState();

    useEffect(() => {
        const getBalance = async () => {
            if(props.tokens.stake != null){
                let stakeAddress = props.tokens.stake;
                let stakeData = await getAccountInfoFromKoios(stakeAddress);
                setWalletData({balance: stakeData[0].total_balance, projects: props.tokens.projectNumber, 
                     tokens: props.tokens.tokenNumber, nfts: props.tokens.nfts.length, fts: props.tokens.fts.length})
                if(props.prices != null){
                    setCurrency(props.prices.currency);
                    let currency = props.prices.currency.value;
                    let _balance = stakeData[0].total_balance/1000000;
                    let value = (currency*_balance).toFixed(5);

                    let tokenBalance = getTokenBalance(props.tokens.fts);
                    let tokenValue = (currency * tokenBalance).toFixed(5);
                    setAdaBalance(value);
                    setTokenBalance(tokenValue);
                }
            }
        }
        getBalance();
    },[props])

    function getTokenBalance(fts){
        let total = 0;
        for(const element of fts){
            let token = element[0];
            let value = (token.price)* (token.quantity/1000000);
            total = total + value;
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
                Ada Balance: {currency.symbol} {adaBalance} <br/>
            </div>
            <div className="summary-item">
                Token Balance: {currency.symbol} {tokenBalance} <br/>
            </div>
            <div className="summary-item">
                Tokens: {walletData.tokens}<br/>
            </div>
            <div className="summary-item">
                Projects: {walletData.projects}
            </div>
            <div className="summary-item">
                NFTs: {walletData.nfts}
            </div>
            <div className="summary-item">
                FTs: {walletData.fts}
            </div>

        </div>
    )
}