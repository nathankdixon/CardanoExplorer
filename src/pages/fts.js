import { C } from "lucid-cardano";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Fts (props){

    const [display, setDisplay] = useState([]);
    const router = useRouter();


    useEffect( () => {
    const getData = async () =>{
      if(props.tokens != null){

        let fts = props.tokens.fts;
        displayTokens(fts);
      }
    }
    getData();
    }, [props]);

    const displayTokens = async (fts) => {
      if(fts== null || props.prices == null){
        //base
      }
      else{
        let _display = [];
        let policies = Object.keys(fts);
        _display.push(<tr key = 'keyregular' className = "grid-item-ft" style={{color: "white"}}>
          <td>Coin</td><td>Ticker</td><td>Quantity</td>
          <td>Price</td><td>24h</td><td>7d</td><td>30d</td><td>1y</td>
          <td>Value</td></tr>)

        let stakeData = await getAccountInfoFromKoios(props.tokens.stake);
        let currency = props.prices.currency;
        let prices = props.prices;
        let _balance = (stakeData[0].total_balance/1000000).toFixed(2);
        let value = (currency.value*_balance).toFixed(2);

        if(prices.privacy == true){
          let valueNum = (value).toString();
          let valueAsterisks = "*".repeat(valueNum.length);
          value = valueAsterisks;
        }

        let ada24hcolor = 'black';
        let ada7dcolor = 'black';
        let ada30dcolor = 'black';
        let ada1ycolor = 'black';

        let ada24hChange = props.prices.usd24h/100;
        let _adachange24h = ((ada24hChange * currency.value)*100).toFixed(2);

        let ada7dChange = props.prices.usd7d/100;
        let _adachange7d = ((ada7dChange * currency.value)*100).toFixed(2);

        let ada30dChange = props.prices.usd30d/100;
        let _adachange30d = ((ada30dChange * currency.value)*100).toFixed(2);

        let ada1yChange = props.prices.usd1y/100;
        let _adachange1y = ((ada1yChange * currency.value)*100).toFixed(2);


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

        //ada FT

        _display.push(<tr key = 'ada-ft' className="grid-item-ft"><td><img src="/cardano.png" className="ft-img"></img></td>
        <td>ADA</td><td>{_balance} </td>
        <td><div className="value"><div className="currency">{currency.symbol}</div>{currency.value}</div></td>
        <td><div style = {{color: ada24hcolor}}>{_adachange24h}%</div>
        </td><td><div style={{color: ada7dcolor}}>{_adachange7d}%</div></td>
        <td><div style={{color: ada30dcolor}}>{_adachange30d}%</div></td>
        <td><div style={{color: ada1ycolor}}>{_adachange1y}%</div></td>
        <td><div className="value"><div className="currency">{currency.symbol}</div>{value}</div></td>
        </tr>)


        for(const policy of policies){
          let token = fts[policy][0];
          let name = token.metadata.ticker;
          if(token.metadata.ticker == null){
            if(token.metadata.name != null){
              name = (token.metadata.name).toUpperCase();
            }
            else{
              name = 'unknown';
            }
          }

          let currency = props.prices.currency;

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

            let tokenPriceAda = token.prices.current* 1/(props.prices.adaUSD);


            if(token.metadata.ticker == 'LQ'){
              quantity = token.quantity/1000000;
            }
            else{
              quantity = token.quantity;
            }

            price = ((tokenPriceAda) * currency.value).toFixed(2);
            value = (price*quantity).toFixed(2);

            let usd24hChange = token.prices.change24h/100;
            _change24h = ((usd24hChange * currency.value)*100).toFixed(2);

            let usd7dChange = token.prices.change7d/100;
            _change7d = ((usd7dChange * currency.value)*100).toFixed(2);

            let usd30dChange = token.prices.change30d/100;
            _change30d = ((usd30dChange * currency.value)*100).toFixed(2);

            let usd1yChange = token.prices.change1y/100;
            _change1y = ((usd1yChange * currency.value)*100).toFixed(2);

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
          
          if(prices.privacy == true){
            let valueNum = (value).toString();
            let valueAsterisks = "*".repeat(valueNum.length);
            value = valueAsterisks;
          }



          _display.push(<tr key = {token.asset_name + 'ftunpriced'} className = "grid-item-ft">
            <td><img className='ft-img' src={token.ipfs}></img></td>
            <td>{name}</td><td>{quantity}</td>
            <td><div className="value"><div className="currency">{currency.symbol}</div>{price}</div></td>
            <td><div style={{color: token24hcolor}}>{_change24h}%</div></td>
            <td><div style={{color: token7dcolor}}>{_change7d}%</div></td>
            <td><div style={{color: token30dcolor}}>{_change30d}%</div></td>
            <td><div style={{color: token1ycolor}}>{_change1y}%</div></td>
            <td><div className="value"><div className="currency">{currency.symbol}</div>{value}</div></td></tr>);
        }
        let table = <table className="ft-table"><tbody>{_display}</tbody></table>
        setDisplay(table);
      }

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

    //returns a grid view of all NFTs grouped by policy
    return (
        <div className="grid-ft">{display}</div>
    )
}