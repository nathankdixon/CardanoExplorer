import { C } from "lucid-cardano";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PieChart from "./piechart";
import Prices from "./prices";
import Token from "./token";

export default function Fts ({tokens}){

    const [display, setDisplay] = useState([]);
    const [priced, setPriced] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [currency, setCurrency] = useState({name: 'usd', symbol: '$', value: 1});
    const [pricedTokens, setPriceTokens] = useState();

    const [prices, setPrices] = useState({adaUSD : null, adaGBP : null, adaBTC : null, adaETH : null})

    const router = useRouter();

    useEffect(() => {
      const updateCurrency = () => {
        displayPriced(pricedTokens, tokens.stake);
      }
      updateCurrency();
    }, [currency])


    useEffect( () => {
    const getData = async () =>{
      if(tokens != null){

        let fts = tokens.fts;;
        displayTokenTable(fts);
        //let pricedTokens = await getTokensWithGeckoPrices(fts);
        //setPriceTokens(pricedTokens);
        //displayPriced(pricedTokens, tokens.stake);
      }
    }
    getData();
    }, [tokens]);

    function setPriceData(data){
      setPrices(data);
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

    const displayPriced = async (tokens, stake) => {
      let _display = [];

      if(tokens != null){

        let accountInfo = await getAccountInfoFromKoios(stake);
        let _balance = (accountInfo[0].total_balance);
        let ada = {ticker : 'ADA', quantity : _balance, ipfs: '/cardano.png', price: prices.adaUSD};

        if(ada.price == null){
          setCurrency({name: 'usd', symbol: '$', value: 1});
        }

        console.log(ada);        
        _display.push(<tr key = 'titles' className = "grid-item-ft" style={{color: "darkBlue"}}><td>Coin</td><td>Ticker</td><td>Quantity</td><td>Price</td><td>Value</td></tr>);
        
        let price = ada.price / currency.value;
        let quantity = ada.quantity/1000000;
        let value = price*quantity;

        let total = value;


        _display.push(<tr key = {'ada'} className = "grid-item-ft">
            <td><img className='ft-img' src={ada.ipfs}></img></td>
            <td>{ada.ticker}</td><td>{quantity.toFixed(2)}</td>
            <td>{currency.symbol}{price.toFixed(2)}</td><td>{currency.symbol}{value.toFixed(2)}</td></tr>);
  
        
        for(const element of tokens){
          let token = element;
          let quantity = (token.quantity/1000000).toFixed(2);
          let price = token.price/currency.value;
          let value = (price*quantity).toFixed(2);
          total = total + (price*quantity);

          _display.push(<tr key = {token.asset_name + 'ftpriced'} className = "grid-item-ft" onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}>
          <td><img className='ft-img' src={token.ipfs}></img></td>
          <td>{token.metadata.ticker}</td><td>{quantity}</td>
          <td>{currency.symbol}{price.toFixed(2)}</td><td>{currency.symbol}{value}</td></tr>);
        }
        _display.push(<tr key = {'total'} className = "grid-item-ft"><td>Total Balance</td><td>{currency.symbol}{total.toFixed(2)}</td></tr>)


        
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
        _display.push(<tr key = 'keyregular' className = "grid-item-ft" style={{color: "darkBlue"}}><td>Coin</td><td>Ticker</td><td>Quantity</td></tr>)
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

          _display.push(<tr key = {token.asset_name + 'ftunpriced'} className = "grid-item-ft" 
            onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}>
            <td><img className='ft-img' src={token.ipfs}></img></td>
            <td>{name}</td><td>{(token.quantity/ 1000000)}</td></tr>);
        }
        let table = <table><tbody>{_display}</tbody></table>
        setDisplay(table);
      }

    }

    const changeCurrency = async (currency) => {

      if(currency == '$'){
        setCurrency({name: 'usd', symbol: '$', value: 1});

      }
      if(currency == '₳'){
        setCurrency({name: 'ada', symbol: '₳', value: prices.adaUSD});

      }
      if(currency == '£'){
        setCurrency({name: 'gbp', symbol: '£', value : prices.adaUSD*(1/(prices.adaGBP))});
      }
      if(currency == '₿'){
        setCurrency({name: 'btc', symbol: '₿', value: prices.adaUSD*(1/prices.adaBTC)});      

      }
      if(currency == 'Ξ'){
        setCurrency({name: 'eth', symbol: 'Ξ', value: prices.adaUSD*(1/prices.adaETH)});

      }

    }

    //returns a grid view of all NFTs grouped by policy
    return (
        <div className="grid-ft">{display}</div>
    )
}