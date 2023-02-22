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
        let _balance = (stakeData[0].total_balance/1000000).toFixed(2);
        let value = (currency.value*_balance).toFixed(2);

        let adaChange = props.prices;
        console.log(adaChange);

        let ada24hChange = props.prices.usd24h/100;
        let _adachange24h = ((ada24hChange * currency.value)*100).toFixed(2);

        let ada7dChange = props.prices.usd7d/100;
        let _adachange7d = ((ada7dChange * currency.value)*100).toFixed(2);

        let ada30dChange = props.prices.usd30d/100;
        let _adachange30d = ((ada30dChange * currency.value)*100).toFixed(2);

        let ada1yChange = props.prices.usd1y/100;
        let _adachange1y = ((ada1yChange * currency.value)*100).toFixed(2);



        _display.push(<tr key = 'ada-ft' className="grid-item-ft"><td><img src="/cardano.png" className="ft-img"></img></td>
        <td>ADA</td><td>{_balance} </td>
        <td>{currency.symbol} {currency.value}</td><td>{_adachange24h}%</td><td>{_adachange7d}%</td>
        <td>{_adachange30d}%</td>
        <td>{_adachange1y}%</td>
        <td><div className="value"><div className="currency">{currency.symbol}</div> {value} </div></td>
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

          if(token.prices != ''){

            price = ((token.prices.current) * currency.value).toFixed(2);
            value = (price*(token.quantity/1000000)).toFixed(2);

            let usd24hChange = token.prices.change24h/100;
            _change24h = ((usd24hChange * currency.value)*100).toFixed(2);

            let usd7dChange = token.prices.change7d/100;
            _change7d = ((usd7dChange * currency.value)*100).toFixed(2);

            let usd30dChange = token.prices.change30d/100;
            _change30d = ((usd30dChange * currency.value)*100).toFixed(2);

            let usd1yChange = token.prices.change1y/100;
            _change1y = ((usd1yChange * currency.value)*100).toFixed(2);

          }



          _display.push(<tr key = {token.asset_name + 'ftunpriced'} className = "grid-item-ft" 
            onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}>
            <td><img className='ft-img' src={token.ipfs}></img></td>
            <td>{name}</td><td>{(token.quantity/ 1000000)}</td><td>{currency.symbol} {price} </td>
            <td>{_change24h}%</td><td>{_change7d}%</td><td>{_change30d}%</td><td>{_change1y}%</td>
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