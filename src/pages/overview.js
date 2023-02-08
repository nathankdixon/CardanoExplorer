import { useDebugValue, useEffect, useState } from "react"

export default function Overview({data}){

    //returns an overview of wallet information

    //ada price, usd price, last 3 transactions, staking rewards, staking pool...
    const [display, setDisplay] = useState();

    useEffect(() => {
        const getWalletData = async () => {
            if(data != null){
                try{
                  let fts = data.fts;

                  console.log(data);
                  //let re = await fetch('https://api.coingecko.com/api/v3/coins/list');
                  //let rs = await re.json();
                  
                  //let found = rs.find(item => item.symbol == 'lq');

                  let _display = [];
                  let accountInfo = await getAccountInfoFromKoios(data.stake);
                  console.log(accountInfo);
                  let _balance = (accountInfo[0].total_balance / 1000000);
                  let _pool = (accountInfo[0].delegated_pool);
                  let _rewards = (accountInfo[0].rewards / 1000000);
                  let _tokenNumber = (data.tokenNumber);
                  let _projectNumber = (data.projectNumber);

                  let req = await fetch('https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&developer_data=false');
                  let res = await req.json();

                  let gbp = res.market_data.current_price.gbp;
                  let usd = res.market_data.current_price.usd;
                  let btc = res.market_data.current_price.btc;

                  let ada30d = res.market_data.price_change_percentage_30d;
                  if(ada30d >0){
                    ada30d = Math.round(ada30d *100)/100 + '%' +' ↑ 30d';
                  }
                  else{
                    ada30d = '↓'  + ada30d + '%';
                  }

                  _display.push(<div key='main'>
                  <div className="grid-item-ft" key='balance'>Balance: {_balance}</div>
                  <div className="grid-item-ft" key='pool'>Pool: {_pool}</div>
                  <div className="grid-item-ft" key='rewards'>Rewards: {_rewards}</div>
                  <div className="grid-item-ft" key='tokenNum'>Tokens Number: {_tokenNumber}</div>
                  <div className="grid-item-ft" key='projectNum'>Projects Number: {_projectNumber}</div>
                  <div className="grid-item-ft" key='market'>Market Prices: ADA / USD ${usd} - {ada30d}</div>
                  <div className="grid-item-ft" key='gbp'>ADA / GBP £{gbp}</div>
                  <div className="grid-item-ft" key ='btc'>ADA / BTC {btc}</div></div>
                    );

                  setDisplay(_display);

                }catch(error){
                    console.log(error);
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
        return res;
      }

    return (
          <div className="overview-inner">{display}</div>
    )
}