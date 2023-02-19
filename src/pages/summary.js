import { useEffect, useState } from "react"

export default function Summary(props){

    const [walletData, setWalletData] = useState({balance: null, total_rewards: null,  available_rewards: null, projects: null, tokens: null, nfts: null, fts:null});
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'})
    const[balance, setBalance] = useState();

    useEffect(() => {
        const getBalance = async () => {
            if(props.tokens.stake != null){
                console.log(props);
                let stakeAddress = props.tokens.stake;
                let stakeData = await getAccountInfoFromKoios(stakeAddress);
                setWalletData({balance: stakeData[0].total_balance, projects: props.tokens.projectNumber, 
                     tokens: props.tokens.tokenNumber, nfts: props.tokens.nfts.length, fts: props.tokens.fts.length})
                if(props.prices != null){
                    console.log(props);
                    setCurrency(props.prices.currency);
                    let currency = props.prices.currency.value;
                    let _balance = stakeData[0].total_balance/1000000;

                    let value = (currency*_balance).toFixed(5);
                    setBalance(value);
                }
            }
        }
        getBalance();
    },[props])

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
                Balance: {currency.symbol} {balance} <br/>
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