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
        _display.push(<tr key = 'keyregular' className = "grid-item-ft" style={{color: "darkBlue"}}>
          <td>Coin</td><td>Ticker</td><td>Quantity</td><td>Price</td><td>Value</td></tr>)

        let stakeData = await getAccountInfoFromKoios(props.tokens.stake);
        let currency = props.prices.currency;
        let _balance = (stakeData[0].total_balance/1000000).toFixed(2);
        let value = (currency.value*_balance).toFixed(2);
        _display.push(<tr key = 'ada-ft' className="grid-item-ft"><td><img src="/cardano.png" className="ft-img"></img></td>
        <td>ADA</td><td>{_balance} </td>
        <td>{currency.symbol} {currency.value}</td><td>{currency.symbol} {value} </td>
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
          let price = ((token.price) * currency.value).toFixed(2);
          let value = (price*(token.quantity/1000000)).toFixed(2);

          if(price == 0.00){
            price = '-';
          }
          if(value == 0.00){
            value = '-'
          }
          _display.push(<tr key = {token.asset_name + 'ftunpriced'} className = "grid-item-ft" 
            onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}>
            <td><img className='ft-img' src={token.ipfs}></img></td>
            <td>{name}</td><td>{(token.quantity/ 1000000)}</td><td>{currency.symbol} {price} </td>
            <td>{currency.symbol} {value}</td></tr>);
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