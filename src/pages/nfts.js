import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Nfts ({tokens}){

    const [display, setDisplay] = useState([]);
    const router = useRouter();

    useEffect(() => {
      showTokens();
    }, [tokens]);

    const showTokens = () => {
      if(tokens == null){
        //base
      }
      else{
        let _display = [];
        let policies = Object.keys(tokens);
        for(const policy of policies){
          let token = tokens[policy][0];
          if(tokens[policy].length > 1){
            _display.push(<div key = {token.asset_name + 'nft'} className = "grid-item-collection" onClick = {() => showTokensFromPolicy(tokens[policy])}><img src={token.ipfs} alt = 'failed to load image'></img></div>);
          }
          else{
            _display.push(<div key = {token.asset_name + 'nft'} className = "grid-item" onClick = {() => router.push('/token/'+token.policy_id+token.asset_name)}><img src={token.ipfs} alt = 'failed to load image'></img></div>);

          }

        }

        setDisplay(_display);
      }

    }

    function showTokensFromPolicy(policy){
        let _display = [];
        
        for(const token of policy){
          _display.push(<div key = {token.asset_name + 'poly'} className = "grid-item" onClick={() => router.push('/token/'+token.policy_id+token.asset_name)}><img src= {token.ipfs}
          alt = 'failed to load image'/></div>);
        }
        setDisplay(_display);
    }

    //returns a grid view of all NFTs grouped by policy
    return (
      <div>
        <nav><button className="sort-button" onClick={() => showTokens()}>Show All</button></nav>
        <div className="grid-nft">{display}</div>
      </div>

    )
}