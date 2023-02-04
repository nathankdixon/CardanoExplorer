import { useEffect, useState } from "react"

export default function Overview({data}){

    //returns an overview of wallet information

    //ada price, usd price, last 3 transactions, staking rewards, staking pool...

    const [out, setOut] = useState();
    const [balance, setBalance] = useState();
    const [pool, setPool] = useState();
    const [rewards, setRewards] = useState();
    const [tokenNumber, setTokenNumber] = useState();
    const [ projectNumber, setProjectNumber] = useState();
    const [usdValue, setUsdValue] = useState();
    const [usd, setUsd] = useState();
    const [gbp, setGbp] = useState();
    const [btc, setBtc] = useState();
    const [ada30d, setAda30d] = useState();



    useEffect(() => {
        const getWalletData = async () => {
            if(data != null){
                try{
                    let accountInfo = await getAccountInfoFromKoios(data.stake);
                    setBalance(accountInfo[0].total_balance / 1000000);
                    setPool(accountInfo[0].delegated_pool);
                    setRewards(accountInfo[0].rewards / 1000000);
                    setTokenNumber(data.tokenNumber);
                    setProjectNumber(data.projectNumber);

                    let req = await fetch('https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&developer_data=false');
                    let res = await req.json();

                    let gbp = res.market_data.current_price.gbp;
                    let usd = res.market_data.current_price.usd;
                    let btc = res.market_data.current_price.btc;
                    let ada30d = res.market_data.price_change_percentage_30d;

                    setUsdValue((accountInfo[0].total_balance / 1000000)*usd);
                    setUsd(usd);
                    setGbp(gbp);
                    setBtc(btc);
                    setAda30d(ada30d + '%');
                    console.log(gbp);

                }catch{
                    console.log('overview error');
                }

            }

        }
        getWalletData();
    }, [data]);

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
        console.log(res);
        return res;
      }

    return (
    <div className="grid-ft">
        <div className="ada-info">
        Balance: ₳ {balance} <br/><br/>
        USD Value : {usdValue}<br/><br/>
        ADA / USD : {usd} <br/><br/>
        ADA / USD 30 Day Change : {ada30d} <br/> <br/>
        ADA / GBP : {gbp} <br/><br/>
        ADA / BTC : {btc} <br/><br/>
        Staking Rewards : ₳ {rewards} <br/><br/>
        Pool : {pool} <br/><br/>
        Number of Tokens : {tokenNumber}<br/><br/>
        Number of Projects : {projectNumber}<br/><br/>
        </div>

        
    </div>
    )
}