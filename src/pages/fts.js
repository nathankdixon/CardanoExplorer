import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Fts ({tokens}){

    const [display, setDisplay] = useState([]);
    const router = useRouter();

    useEffect(() => {
      const showTokens = () => {
        if(tokens == null){
          //base
        }
        else{
          let _display = [];
          let policies = Object.keys(tokens);
          _display.push(<tr key = 'key' className = "grid-item-ft"><td>Coin</td><td>Ticker</td><td>Quantity</td><td>Price</td></tr>)
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
            _display.push(<tr key = {token.asset_name + 'ft'} className = "grid-item-ft" onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}><td><img className='ft-img' src={token.ipfs}></img></td><td>{name}</td><td>{token.quantity}</td></tr>);
          }
          let table = <table><tbody>{_display}</tbody></table>
          setDisplay(table);
        }

      }
      showTokens();
    }, [tokens]);


    //returns a grid view of all NFTs grouped by policy
    return (
    <div className="grid-ft">{display}</div>
    )
}