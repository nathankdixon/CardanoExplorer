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
          {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh'}});
        let res = await data.text();
        return JSON.parse(res);
      }catch(error){
        console.log(error);
      }
        
    }
}

