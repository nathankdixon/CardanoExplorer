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
          _display.push(<div key = 'title' className = "grid-item-ft">Coins: </div>)
          _display.push(<div key = 'break'><br/></div>);
          for(const policy of policies){
            let token = tokens[policy][0];
            _display.push(<div key = {token.asset_name + 'ft'} className = "grid-item-ft" onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}>{token.metadata.name} : {token.quantity}</div>);
          }
          
          setDisplay(_display);
        }

      }
      showTokens();
    }, [tokens]);


    //returns a grid view of all NFTs grouped by policy
    return (
    <div className="grid-ft"><div className="fts">{display}</div>
    </div>
    )
}