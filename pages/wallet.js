import React, { useState, useEffect } from "react";
import { BrowserWallet } from "@meshsdk/core";
import Token from "./token";
import Link from "next/link";


const Wallet = (props) => {
    const[n, setn] = useState();
    const [tokens, setTokens] = useState([]);
    const [balance, setBalance] = useState();
    const [policies, setPolicies] = useState([]);
    const [projectsNumber, setProjectsNumber] = useState();

    useEffect(() => {
        async function getSome(wallet){
            if(wallet != null){
                const _wallet = await BrowserWallet.enable(wallet);
                const _assets = await _wallet.getAssets();
                const _balance = await _wallet.getLovelace();
                setBalance(_balance/1000000);
                const _tokens = await createTokens(_assets);
                setTokens(_tokens);
                const _policies = groupTokensByPolicyId(_tokens);
                const _sortedPolicyList = sortPolicies(_policies);
                setPolicies(_sortedPolicyList);
                displayTokens(_policies, 'ALL');
                props.onDataChange(true);
            }

        }
        getSome(props.walletname);
    })

    function displayTokens(tokenList, type){
        let display = [];
        let keys = Object.keys(tokenList);
        setProjectsNumber(keys.length);
        for(const element of keys){
          let token = tokenList[element][0];
          if(type == 'ALL'){
            display.push(<div key={token.policyId} className="grid-item nft"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
            <div className="item-info">{token.policyId}<div><Link href={"/tokens/"+token.unit}>Open</Link></div></div></div>);
          }
          if(type == 'nft'){
            if(token.quantity == 1){
              display.push(<div key={token.policyId} className="grid-item nft"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
              <div className="item-info">{token.policyId}</div><div><Link href={"/tokens/"+token.unit}>Open</Link></div><div className="item-info">{tokenList[element].length}</div></div>);
            }
          }
          if(type == 'ft'){
            if(token.quantity != 1){
              display.push(<div key={token.policyId} className=" grid-item coin"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
              <div className="item-info">{token.policyId}</div><div><Link href={"/tokens/"+token.unit}>Open</Link></div><div className="item-info">{token.quantity}</div></div>);
            }
          } 
    
        }
        setn(display);
        return display;
      }

    function groupTokensByPolicyId(tokenList){
        const policyList = {};
        for(const token in tokenList){
          const policyId = tokenList[token].policyId;
          
          if(policyId in policyList){
            policyList[policyId].push(tokenList[token]);
          }else {
            policyList[policyId] = [tokenList[token]];
          }
    
        }
        return policyList;
    
      }


    function sortPolicies(policiesList){
        //policies
        const keys = Object.keys(policiesList);
        //token lists
        const values = Object.values(policiesList);
        values.sort((a,b) => a.length - b.length).reverse();
        const _sorted = {};
        for (let i=0;i<keys.length;i++){
          _sorted[keys[i]] = values [i];
        }
    
        return _sorted;
    }

    async function createTokens(assets){
        const _tokens = [];
        for(const element of assets){
    
          let token = new Token(element.assetName, element.fingerprint, element.policyId, element.quantity, element.unit);
          console.log(token.unit +" "+token.name);
          token.metadata = await token.getMetadata();
          if(token.metadata != null){
            let ipfs = token.getIpfsFromMetadata();
            token.ipfs = ipfs;
            _tokens.push(token);
          }
        }
        return _tokens;
    
      }

    return(<div><h1>{n}</h1></div>);

}
export default Wallet;