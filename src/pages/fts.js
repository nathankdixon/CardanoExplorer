import { useEffect, useState } from "react";

// exports a table of fungible tokens with prices, price changes and values
export default function Fts (props){

    const [display, setDisplay] = useState([]);

    useEffect( () => {
    const getData = async () =>{
      if(props.tokens == null || props.prices == null){
        //base
      }
      else{
        let _display = [];

        // add column names
        _display.push(<tr key = 'keyregular' className = "grid-item-ft" style={{color: "white"}}>
          <td>Coin</td><td>Ticker</td><td>Quantity</td>
          <td>Price</td><td>24h</td><td>7d</td><td>30d</td><td>1y</td>
          <td>Value</td></tr>)


        // get stake info from koios
        let stakeData = await getAccountInfoFromKoios(props.tokens.stake);

        if(stakeData[0] != null){
          // ada balance at stake address

          // selected currency
          let currency = props.prices.currency;

          // price data
          let prices = props.prices;

          // add ada price info and values to table
          let adaInfoToAdd = addAdaInfoToDisplay(stakeData, currency, prices);

          // add each token to the table with price data if available
          let tokenInfoToAdd = adddTokenInfoToDisplay(currency, prices);

          _display.push(adaInfoToAdd);
          _display.push(tokenInfoToAdd);

        }

        // output to page
        let table = <table className="ft-table"><tbody>{_display}</tbody></table>
        setDisplay(table);
      }
    }
    getData();
    }, [props]);


    function addColumnNamesToDisplay(){

    }

    // adds all fungible tokens with price, price changes and values to the table
    function adddTokenInfoToDisplay(currency, prices){

      // since tokens are fungible - one coin per policy
      let policies = Object.keys(props.tokens.fts);
      let display = [];

      for(const policy of policies){

        // list length 1 - as tokens are fungible
        let token = props.tokens.fts[policy][0];

        // 4 letter symbol 
        let name = token.metadata.ticker;
        if(token.metadata.ticker == null){

          // otherwise get name from metadata
          if(token.metadata.name != null){
            name = (token.metadata.name).toUpperCase();
          }
          else{
            name = 'unknown';
          }
        }

        let price = '-';
        let value = '-';

        let _change24h = '-';
        let _change7d = '-';
        let _change30d = '-';
        let _change1y = '-';

        let token24hcolor = 'black';
        let token7dcolor = 'black';
        let token30dcolor = 'black';
        let token1ycolor = 'black';

        let quantity = 0;

        if(token.prices != ''){

          // price of token in ADA
          let tokenPriceAda = token.prices.current* 1/(props.prices.adaUSD);

          // quantity decimal points differ across tokens. LQ quantity applied manually based on DEXs

          // ------ quantity lacks metadata standard ----------
          if(token.metadata.ticker == 'LQ'){
            quantity = token.quantity/1000000;
          }
          else{
            quantity = token.quantity;
          }

          // price of token converted to current selected currency
          price = ((tokenPriceAda) * currency.value).toFixed(2);

          // value = price * quantity
          value = (price*quantity).toFixed(2);


          // price change values
          let usd24hChange = token.prices.change24h/100;
          _change24h = ((usd24hChange * currency.value)*100).toFixed(2);

          let usd7dChange = token.prices.change7d/100;
          _change7d = ((usd7dChange * currency.value)*100).toFixed(2);

          let usd30dChange = token.prices.change30d/100;
          _change30d = ((usd30dChange * currency.value)*100).toFixed(2);

          let usd1yChange = token.prices.change1y/100;
          _change1y = ((usd1yChange * currency.value)*100).toFixed(2);

          // colors of price change values
          if(usd24hChange > 0){
            token24hcolor = '#49f500';
          }
          else if(usd24hChange == 0){
            token24hcolor = 'grey';
          }
          else{
            token24hcolor = 'red';
          }

          if(usd7dChange > 0){
            token7dcolor = '#49f500';
          }
          else if(usd7dChange == 0){
            token7dcolor = 'grey';
          }
          else{
            token7dcolor = 'red';
          }

          if(usd30dChange > 0){
            token30dcolor = '#49f500';
          }
          else if(usd30dChange == 0){
            token30dcolor = 'grey';
          }
          else{
            token30dcolor = 'red';
          }

          if(usd1yChange > 0){
            token1ycolor = '#49f500';
          }
          else if(usd1yChange == 0){
            token1ycolor = 'grey';
          }
          else{
            token1ycolor = 'red';
          }

        }

        // privacy option
        if(prices.privacy == true){
          let valueNum = (value).toString();
          let valueAsterisks = "*".repeat(valueNum.length);
          value = valueAsterisks;
        }

        // add to display to be returned
        display.push(<tr key = {token.asset_name + 'ftunpriced'} className = "grid-item-ft">
          <td><img className='ft-img' src={token.ipfs}></img></td>
          <td>{name}</td><td>{quantity}</td>
          <td><div className="value"><div className="currency">{currency.symbol}</div>{price}</div></td>
          <td><div style={{color: token24hcolor}}>{_change24h}%</div></td>
          <td><div style={{color: token7dcolor}}>{_change7d}%</div></td>
          <td><div style={{color: token30dcolor}}>{_change30d}%</div></td>
          <td><div style={{color: token1ycolor}}>{_change1y}%</div></td>
          <td><div className="value"><div className="currency">{currency.symbol}</div>{value}</div></td></tr>);
      }

      return display;
    }

    // adds ADA price, price changes and values to the table
    function addAdaInfoToDisplay(stakeData, currency, prices){

      let lovelaces = stakeData[0].total_balance;




      let _balance = (lovelaces/1000000).toFixed(2);
      let value = (currency.value*_balance).toFixed(2);

      // if privacy option is selected
      // asterisk out any sensitive data
      if(prices.privacy){
        let valueNum = (value).toString();
        let valueAsterisks = "*".repeat(valueNum.length);
        value = valueAsterisks;
      }

      // price change colors
      let ada24hcolor = 'black';
      let ada7dcolor = 'black';
      let ada30dcolor = 'black';
      let ada1ycolor = 'black';


      // calculate price changes in select currency
      let ada24hChange = prices.usd24h/100;
      let _adachange24h = ((ada24hChange * currency.value)*100).toFixed(2);

      let ada7dChange = prices.usd7d/100;
      let _adachange7d = ((ada7dChange * currency.value)*100).toFixed(2);

      let ada30dChange = prices.usd30d/100;
      let _adachange30d = ((ada30dChange * currency.value)*100).toFixed(2);

      let ada1yChange = prices.usd1y/100;
      let _adachange1y = ((ada1yChange * currency.value)*100).toFixed(2);


      // apply price change colors
      if(ada24hChange < 0){
        ada24hcolor = 'red';
      }
      else if(ada24hChange == 0){
        ada24hcolor = 'grey';
      }
      else{
        ada24hcolor = '#49f500';
      }

      if(ada7dChange < 0){
        ada7dcolor = 'red';
      }
      else if(ada7dChange == 0){
        ada7dcolor = 'grey';
      }
      else{
        ada7dcolor = '#49f500';
      }

      if(ada30dChange < 0){
        ada30dcolor = 'red';
      }
      else if(ada30dChange == 0){
        ada30dcolor = 'grey';
      }
      else{
        ada30dcolor = '#49f500';
      }

      if(ada1yChange < 0){
        ada1ycolor = 'red';
      }
      else if(ada1yChange == 0){
        ada1ycolor = 'grey';
      }
      else{
        ada1ycolor = '#49f500';
      }

      // add to table to be retuned
      let adaInfo = (<tr key = 'ada-ft' className="grid-item-ft"><td><img src="/cardano.png" className="ft-img"></img></td>
      <td>ADA</td><td>{_balance} </td>
      <td><div className="value"><div className="currency">{currency.symbol}</div>{currency.value}</div></td>
      <td><div style = {{color: ada24hcolor}}>{_adachange24h}%</div>
      </td><td><div style={{color: ada7dcolor}}>{_adachange7d}%</div></td>
      <td><div style={{color: ada30dcolor}}>{_adachange30d}%</div></td>
      <td><div style={{color: ada1ycolor}}>{_adachange1y}%</div></td>
      <td><div className="value"><div className="currency">{currency.symbol}</div>{value}</div></td>
      </tr>);

      return adaInfo;
    }

    // used to get ada balance from stake address from koios
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

    //returns a grid view of all NFTs grouped by policy
    return (
        <div className="grid-ft">{display}</div>
    )
}