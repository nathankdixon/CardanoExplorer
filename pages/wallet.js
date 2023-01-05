import { useState } from "react";
import Link from "next/link";
import DropdownBox from "./dropdownBox";


function Wallet (props) {


    function displayTokens(tokenList, type){
    
        let keys = Object.keys(tokenList);
        let display = [];
    
    
        for(const element of keys){
          let token = tokenList[element][0];
          let tokenArr = tokenList[element];
          let tokenDisplay = [];
          for(const element of tokenArr){
            tokenDisplay.push(<div className = "dropdown-content" key = {element.name}><img className = "token-sub-img" src = {element.ipfs}></img><div className="item-info">Name:&nbsp;{element.name}</div><div className="item-info"><Link href={"/token/"+element.unit}>Open</Link></div></div>)
          }
          
    
          if(type == 'ALL'){
            display.push(<div key={token.unit} className="grid-item"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
            <div className="item-info">Policy ID: &nbsp;{token.policyId}<br /></div><div className="item-info">Quantity:&nbsp;{tokenList[element].length}</div></div>);
            display.push(<div><DropdownBox content = {tokenDisplay}/></div>);
          }
          if(type == 'nft'){
            if(token.quantity == 1){
              display.push(<div key={token.unit} className="grid-item nft"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
              <div className="item-info">Policy ID: &nbsp;{token.policyId}<br /></div><div className="item-info">Quantity:&nbsp;{tokenList[element].length}</div></div>);
              display.push(<div><DropdownBox content = {tokenDisplay}/></div>);
            }
          }
          if(type == 'ft'){
            if(token.quantity != 1){
              display.push(<div key={token.unit} className=" grid-item coin"><img className = "token-img" src={token.ipfs} alt = 'failed to load image'></img>
              <div className="item-info">{token.policyId}</div><div><Link href={"/token/"+token.unit}>Open</Link></div><div className="item-info">Quantity:&nbsp;{token.quantity}</div></div>);
            }
          } 
    
        }
        return display;
      }

    return(
        <div>{displayTokens(props.list, props.type)}</div>
    );


    
}

export default Wallet;