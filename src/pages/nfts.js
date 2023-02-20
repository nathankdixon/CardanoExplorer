import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Nfts ({tokens}){

    const [display, setDisplay] = useState([]);
    const router = useRouter();

    useEffect(() => {
      if(tokens != null){
        let nfts = tokens.nfts;
        showTokens(nfts);

      }
    }, [tokens]);

    const showTokens = (tokens) => {
      if(tokens == null){
        //base
      }
      else{
        let _display = [];
        let policies = Object.keys(tokens);
        for(const policy of policies){
          let token = tokens[policy][0];

          let name = token.metadata.name;
          let collection = '';

          if(token.metadata.collection != null){
            collection = token.metadata.collection;
          }
          else if(token.metadata.Collection != null){
            collection = token.metadata.Collection;
          }
          else if(token.metadata.project != null){
            collection = token.metadata.project;
          }
          else if(token.metadata.Project != null){
            collection = token.metadata.Project;
          }
          else{
            console.log(token);
          }

          if(tokens[policy].length > 1){
            _display.push(
            <div key = {token.asset_name + 'nft'} className = "grid-item-collection" onClick = {() => showTokensFromPolicy(tokens[policy])}>
              <Image className="grid-img" src={token.ipfs} alt = 'failed to load image' width={270} height={270}/>
                <div className="grid-item-title">{name}</div>
                <div className="grid-item-text">{collection}</div>
                <div className="grid-item-text">Quantity: {tokens[policy].length}</div>
              </div>);
          }
          else{
            _display.push(
            <div key = {token.asset_name + 'nft'} className = "grid-item" onClick = {() => router.push('/'+tokens.stake+'/'+token.policy_id+token.asset_name)}>
              <Image className='grid-img' src={token.ipfs} alt = 'failed to load image' width={270} height={270}/>
              <div className="grid-item-info">
                <div className="grid-item-title">{name}</div>
                <div className="grid-item-text" >{collection}</div>
                <div className="grid-item-text" >Quantity: {tokens[policy].length}</div>
              </div>
              </div>);

          }

        }

        setDisplay(_display);
      }

    }

    function showTokensFromPolicy(policy){
        let _display = [];
        
        for(const token of policy){

          let name = token.metadata.name;
          let collection = '';

          if(token.metadata.collection != null){
            collection = token.metadata.collection;
          }
          else if(token.metadata.Collection != null){
            collection = token.metadata.Collection;
          }
          else if(token.metadata.project != null){
            collection = token.metadata.project;
          }
          else if(token.metadata.Project != null){
            collection = token.metadata.Project;
          }
          else{
            console.log(token);
          }


          _display.push(
          <div key = {token.asset_name + 'poly'} className = "grid-item" onClick={() => router.push('/'+tokens.stake+'/'+token.policy_id+token.asset_name)}>
            <img className="grid-img" src= {token.ipfs}
          alt = 'failed to load image'/>
            <div className="grid-item-info">
            <div className="grid-item-title">{name}</div>
            <div className="grid-item-text" >{collection}</div>
              </div>
          </div>);
        }
        setDisplay(_display);
    }

    //returns a grid view of all NFTs grouped by policy
    return (
      <div>
        <nav><button className="setting-button" onClick={() => showTokens(tokens.nfts)}>Show All</button></nav>
        <div className="grid-nft">{display}</div>
      </div>

    )
}