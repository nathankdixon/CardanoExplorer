import { useState } from "react";
export default class Token{

    constructor(name, fingerprint, policyId, quantity, unit){
        this.name = name;
        this.fingerprint = fingerprint;
        this.policyId = policyId;
        this.quantity = quantity; 
        this.unit = unit;
        
    }


    async getMetadata(){
      try{
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+this.unit,
          {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh',
                    'cache-control': 'max-age=31536000'}});
        let res = await data.text();
        this.metadata = JSON.parse(res);
        return this.metadata;
      }catch(error){
        console.log(error);
      }
        
    }
}

