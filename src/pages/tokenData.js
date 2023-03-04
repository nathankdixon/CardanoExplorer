import { assetPrefix } from "next.config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState} from "react";
import Policy from "./policy";
import Prices from "./prices";
import Token from "./token";
import TokenDisplay from "./tokenDisplay";

// this function fetches token data from blockfrost and market data from opencnft
// data is then passed to TokenDisplay to be displayed
function TokenData (props) {

  // this object holds all the data that will be passed to TokenDisplay
  const [data, setData] = useState({token: '', name: '', created:'', fingerprint:'', rarityRank:'',rarityScore:'',
                              statisticalRank:'', statisticalScore:''});

    useEffect(() => {
        const getTokenData = async () => {
          if(props.assetId == null){
            console.log('asset ID was undefined');
          }
          else{
             // from url in [token].jsx
             let assetId = props.assetId;

             // fetch asset data from blockfrost
             let assetData = await loadTokenData(assetId);
             if(assetData == null){
               setDisplay('invalid asset id')
             }
             else{
                let token = await createToken(assetData); 

                let _assetData = await getCnftAssetData(props.assetId);
                let createdData = (_assetData.created_at).substring(0,10);
                let fingerprint = (_assetData.fingerprint);
                let rarityRank = _assetData.rarity_rank;
                let rarityScore = _assetData.rarity_score;
                let statisticalRank = _assetData.statistical_rank;
                let statisticalScore = _assetData.statistical_score;


                let decryptName = Buffer.from(token.asset_name, 'hex').toString();
                console.log(decryptName);


                let data = {token: token, name: decryptName, created: createdData,
                  fingerprint: fingerprint, rarityRank: rarityRank, rarityScore:  rarityScore,
                statisticalRank: statisticalRank, statisticalScore};
                
                setData(data);

             }

          }
        }
        getTokenData();
      }, [props])
      

    async function createToken(assetData){
      let assetName = assetData.asset_name;
      let policy = assetData.policy_id;
      let quantity = assetData.quantity;

      let token = new Token(assetName, policy, quantity);
      let tokenMetadata = await token.getMetadata();
      token.metadata = tokenMetadata;
      let ipfs = '';

      if(token.metadata != null){
        ipfs = token.getIpfsFromMetadata();
        if(ipfs != null){
          token.ipfs = ipfs;
        }
      }
      return token;
    }

    // fetch token metadata from blockfrost
    async function loadTokenData(assetId){
      try{
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+assetId,
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
        const res = await data.json();
        if(data.status != 200){
          return null;
        }
        return res;
      }catch(error){
        return null;
      }
    }
    
    async function getCnftAssetData(asset){
      try{
        const data = await fetch('https://api.opencnft.io/1/asset/'+asset,
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
        const res = await data.json();
        if(data.status!= 200){
          return null;
        }
        return res;
      }catch(error){
        return null;
      }
    }

 
    // fetch token metadata from blockfrost
    async function getPrevTxs(assetId){
      try{
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+assetId+'/transactions',
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
        const res = await data.json();
        if(data.status != 200){
          return null;
        }
        return res;
      }catch(error){
        return null;
      }
    }

    return(
        <TokenDisplay data = {data} stake={props.stake}/>)
}
export default TokenData;
