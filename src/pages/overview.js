import { useEffect, useState } from "react"

export default function Overview({data}){

    //returns an overview of wallet information

    //ada price, usd price, last 3 transactions, staking rewards, staking pool...
    const [display, setDisplay] = useState();

    useEffect(() => {
        const getWalletData = async () => {
            if(data != null){
                try{

                  //get coin gecko data
                  let fts = data.fts;
                  const response = await fetch('/coin-gecko.json');
                  const geckoJson = await response.json();
                  let geckoCoins = [];                

                  for(const element of fts){
                    let token = element[0];
                    let ticker = '';
                    try{
                      ticker = token.metadata.ticker;
                      
                    }catch(error){
                      ticker = null;
                    }

                    if(ticker != null){
                      let isInGecko  = geckoJson.find(item => item.symbol == ticker.toLowerCase());
                      if(isInGecko != null){
                        token.id = isInGecko.id;
                        geckoCoins.push(token);
                      }
                    }
                  }
                  
                  //dislay

                  let tokensOnGecko = [];
                  for(const element of geckoCoins){
                    let req = await fetch('https://api.coingecko.com/api/v3/coins/'+element.id);
                    let res = await req.json();
                    if(res.asset_platform_id == 'cardano'){
                      element.price = res.market_data.current_price.usd;
                      tokensOnGecko.push(element);
                    }
                  }
                  
                  console.log(tokensOnGecko);
                  let coinBalance = 0;
                  for(let i=0; i<tokensOnGecko.length;i++){
                    let coin = tokensOnGecko[i];
                    coinBalance = coinBalance+ ((coin.quantity/1000000)*coin.price);
                  }



                  let _display = [];
                  let accountInfo = await getAccountInfoFromKoios(data.stake);
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

                  let _balanceUsd = (_balance * usd).toFixed(2);


                  let ada30d = res.market_data.price_change_percentage_30d;
                  if(ada30d >0){
                    ada30d = Math.round(ada30d *100)/100 + '%' +' ↑ 30d';
                  }
                  else{
                    ada30d = '↓'  + ada30d + '%';
                  }

                  _display.push(<div className ='main' key='main'>
                  <div className="grid-item-overview" key='stake'>{data.stake}</div> 
                  <br/><br/>                 
                  <div className="grid-item-overview" key='balance'>Balance: ₳{_balance} ~ (${_balanceUsd})</div>  
                  <br/><br/>                 
                  <div className="grid-item-overview" key='native'>Native Token Value: ${coinBalance.toFixed(2)}</div>
                  <br/><br/>                 
                  <div className="grid-item-overview" key='tokenNum'>Tokens Number: {_tokenNumber}</div>
                  <br/><br/>                 
                  <div className="grid-item-overview" key='projectNum'>Projects Number: {_projectNumber}</div>


                  </div>
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