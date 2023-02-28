import { useEffect, useState } from "react";
import Collection from "./collection";
import NftGrid from "./nftGrid";
import Policy from "./policy";
import Prices from "./prices";
import Token from "./token";

function PolicyData (props) {

    const [policy, setPolicy] = useState();
    const [tokens, setTokens] = useState();
    const [prices, setPrices] = useState();


    useEffect(() => {
        const getPolicyData = async () => {
          if(props.stake == null){
            console.log('stake was undefined');
          }
          else if(props.policy == null){
            console.log('policy undefined');
          }
          else{
            console.log(props.stake + '- ' +props.policy);
            let tokens = [];

            let assets = await getAssetsOfPolicyFromKoios(props.stake, props.policy);

            for(let i =0;i<assets.length;i++){
              let token = new Token(assets[i].asset_name, assets[i].policy_id, assets[i].quantity);
              token.metadata = await token.getMetadata();

              if(token.metadata != null){
                let ipfs = token.getIpfsFromMetadata();
                token.ipfs = ipfs;
              }
              tokens.push(token);
            }
            setTokens(tokens);

          }
        }
        getPolicyData();
      }, [props])

        // used when fetching handle address
  async function getStakeFromAddressKoios(address){
    try{
      const req = await fetch('https://api.koios.rest/api/v0/address_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_addresses": [ address
          ]
        })
      });
  
      const res = await req.json();
      return res[0].stake_address;
    }catch(error){
      return null;
    }

  }

  // returns base address from handle
  const getAddressFromHandle = async (handle) => {
    console.log(handle);
    try{
      let policyID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';
    
      // A blank Handle name should always be ignored.
      if (handle.length === 0) {
        return null;
      }
    
      // Convert handleName to hex encoding.
      let assetName = Buffer.from(handle).toString('hex');
    
      let data = await fetch(
        `https://cardano-mainnet.blockfrost.io/api/v0/assets/`+policyID+assetName+'/addresses',
        {
          headers: {
            // Your Blockfrost API key
            project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh'}
        });

      let res = await data.json();

      console.log(res);
      
      let stake = await getStakeFromAddressKoios(data[0].address);
      return stake;
    }catch(error){
      console.log(error);
      return null;
    }

  }

  // no asset limit on how many assets gets returned on one request
  // koios, blockfrost is limited by 100 results per page
  async function getAssetsOfPolicyFromKoios(stakeAddress, policy){

    console.log(stakeAddress);

    if(stakeAddress.startsWith('$')){
      stakeAddress = await getAddressFromHandle(props.stake);
    }

    console.log(stakeAddress);

    let assets = [];
    try{
      const req = await fetch('https://api.koios.rest/api/v0/account_assets', {
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

      for(let i=0;i<res[0].asset_list.length; i++){
        let token = res[0].asset_list[i];

        if(token.policy_id == policy){
          assets.push(token);
        }
      }
      return assets;
    }catch(error){
      return null;
    }

  }

    function setPriceData(data){
      setPrices(data);
    }

    return(<div>
        <Prices data = {setPriceData}/>
        <label>Policy Info</label>
        <Policy policy = {props.policy} prices={prices}/>
        <label>Your Wallet</label>
        <NftGrid nfts = {tokens} stake={props.stake}/>
        <Collection policy = {props.policy} stake={props.stake}/>
    </div>)
}
export default PolicyData;
