import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Prices from "./prices";
import Token from "./token";

export default function Fts ({tokens}){

    const [display, setDisplay] = useState([]);
    const [priced, setPriced] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [coinPrices, setCoinPrices] = useState();

    const router = useRouter();

    useEffect( () => {
    const getData = async () =>{
      if(tokens != null){
        let fts = tokens.fts;
        displayTokenTable(fts);
        let pricedTokens = await getTokensWithGeckoPrices(fts);
        displayPriced(pricedTokens, tokens.stake);
      }
    }
    getData();
    }, [tokens]);

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

    const getAdaBalancePriced = async (stake) => {
      if(stake != null){
        let accountInfo = await getAccountInfoFromKoios(stake);
        let _balance = (accountInfo[0].total_balance);
  
        let req = await fetch('https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&developer_data=false');
        let res = await req.json();
        let usd = res.market_data.current_price.usd;
  
        let ada = {ticker : 'ADA', quantity : _balance, ipfs: '/cardano.png', price: usd.toFixed(2)};
        return ada;
      }

    }

    const displayPriced = async (tokens, stake) => {
      let _display = [];

      if(tokens != null){

        let ada = await getAdaBalancePriced(stake);

        _display.push(<tr key = 'key' className = "grid-item-ft"><td>Coin</td><td>Ticker</td><td>Quantity</td><td>Price</td><td>Value</td></tr>);
  
        _display.push(<tr key = {'ada'} className = "grid-item-ft">
            <td><img className='ft-img' src={ada.ipfs}></img></td>
            <td>{ada.ticker}</td><td>{(ada.quantity/ 1000000).toFixed(2)}</td>
            <td>${ada.price}</td><td>${(ada.price*ada.quantity/1000000).toFixed(2)}</td></tr>);
  
        for(const element of tokens){
          let token = element;

          _display.push(<tr key = {token.asset_name + 'ft'} className = "grid-item-ft" onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}>
          <td><img className='ft-img' src={token.ipfs}></img></td>
          <td>{token.metadata.ticker}</td><td>{(token.quantity/ 1000000).toFixed(2)}</td>
          <td>${token.price}</td><td>${(token.price*token.quantity/1000000).toFixed(2)}</td></tr>);
        }
        
        let table = <table><tbody>{_display}</tbody></table>
        setPriced(table);
        setIsVisible(true);

      }
    }

    const getTokensWithGeckoPrices = async (fts) => {

      
      let coinsOnGecko = [];

      if(fts != null){
        let request = await fetch('/coin-gecko.json');
        let geckoData = await request.json();

        //search gecko list for owned coins of same ticker
        for(const element of fts){
          let token = element[0];
          let ticker = '';
          try{
            ticker = token.metadata.ticker;
            
          }catch(error){
            ticker = null;
          }


          //get ids of matched coins
          if(ticker != null){
            let foundGeckoCoin  = geckoData.find(item => item.symbol == ticker.toLowerCase());
            if(foundGeckoCoin != null){
              token.id = foundGeckoCoin.id;
              coinsOnGecko.push(token);
            }
          }
        }

        //get info for each coin

        let pricedTokens = [];
        for(const element of coinsOnGecko){
          let req = await fetch('https://api.coingecko.com/api/v3/coins/'+element.id);
          let res = await req.json();
          if(res.asset_platform_id == 'cardano'){
            element.price = res.market_data.current_price.usd.toFixed(2);
            pricedTokens.push(element);
          }
        }
        return pricedTokens;

      }

    }

    const displayTokenTable = (tokens) => {
      if(tokens == null){
        //base
      }
      else{
        let _display = [];
        let policies = Object.keys(tokens);
        _display.push(<tr key = 'key' className = "grid-item-ft"><td>Coin</td><td>Ticker</td><td>Quantity</td></tr>)
        for(const policy of policies){
          let token = tokens[policy][0];
          let name = token.metadata.ticker;
          if(token.metadata.ticker == null){

            if(token.metadata.name != null){
              name = token.metadata.name;
            }
            else{
              name = 'unknown';
            }


          }
          _display.push(<tr key = {token.asset_name + 'ft'} className = "grid-item-ft" onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}>
            <td><img className='ft-img' src={token.ipfs}></img></td>
            <td>{name}</td><td>{(token.quantity/ 1000000)}</td></tr>);
        }
        let table = <table><tbody>{_display}</tbody></table>
        setDisplay(table);
      }

    }
    //returns a grid view of all NFTs grouped by policy
    return (
      <div>
        <Prices/>
        <div className="fts">
          <div className="grid-ft" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>{priced}</div>
          <div className="grid-ft">{display}</div>
        </div>
      </div>

    )
}