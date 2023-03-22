import { useEffect, useState } from "react";
import Policy from "./policy";
import PolicyCollection from "./policyCollection";
import PolicyOwned from "./policyOwned";
import Prices from "./prices";
import Token from "./token";

// this component is used to display data for a policy id
// it returns policy information, owned token from policy, and all nfts in collection which can be searched through
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
            let stakeAddress = props.stake;
            if(stakeAddress.startsWith('$')){
              stakeAddress = await getAddressFromHandle(stakeAddress.slice(1));

            }
            if(stakeAddress != null){

              let tokens = [];

              // returns assets owned by stake of policy
              let assets = await getOwnedAssetsOfPolicy(stakeAddress, props.policy);

            for(const element of assets){
              let token = new Token(element.asset_name, element.policy_id, element.quantity);
              token.metadata = await token.getMetadata();

              
              if(token.metadata != null){
                let ipfs = token.getIpfsFromMetadata();
                token.ipfs = ipfs;
              }
              tokens.push(token);
              }
              setTokens(tokens);
            }
            else{
              console.log('wallet error');
            }
            


          }
        }
        getPolicyData();
      }, [props])

    // this method fetches the stake address for any given base address.
    // it uses a Blockfrost API which returns data for specific addresses.

    // @param - a base address, containing the stake key for its wallet.
    // @return a stake address, an account address which can be used to fetch data for its corresponding wallet
    async function getStakeFromAddress(address){
      try{
        // fetch data relating to address
        const req = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/addresses/'+address, 
          {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});

          // JSON returned contains stake address for given base address.
          const res = await req.json();
          return res.stake_address;
      }catch(error){ 
          // handle error
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
      
      let stake = await getStakeFromAddress(res[0].address);
      return stake;
    }catch(error){
      console.log(error);
      return null;
    }

  }

  // no asset limit on how many assets gets returned on one request
  // koios, blockfrost is limited by 100 results per page
  async function getOwnedAssetsOfPolicy(stakeAddress, policy){

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
        <label>Policy Info</label>
        <Policy policy = {props.policy}/>
        <label>Your Wallet</label>
        <PolicyOwned nfts = {tokens} policy = {props.policy}/>
        <PolicyCollection policy = {props.policy} />
    </div>)
}
export default PolicyData;
