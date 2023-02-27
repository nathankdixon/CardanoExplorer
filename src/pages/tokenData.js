import { assetPrefix } from "next.config";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import MetadataTable from "./metadataTable";
import Policy from "./policy";
import Prices from "./prices";
import Token from "./token";

function TokenData (props) {

  const [display, setDisplay] = useState();
  const [tokenName, setTokenName] = useState();
  const [image, setImage] = useState();
  const [metadata, setMetadata] = useState();
  const [tokenInfo, setTokenInfo] = useState();
  const [data, setData] = useState();
  const [policy, setPolicy] = useState();

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
                setTokenInfo(<label>Asset name:{token.asset_name} Policy ID: {token.policy_id}</label>);
                setPolicy(token.policy_id);

                let _assetData = await getCnftAssetData(props.assetId);
                let createdData = _assetData.created_at;
                let fingerprint = _assetData.fingerprint;
                let name = _assetData.name;
                let rarityRank = _assetData.rarity_rank;
                let rarityScore = _assetData.rarity_score;
                let statisticalRank = _assetData.statistical_rank;
                let statisticalScore = _assetData.statistical_score;

                setData(<div><div>created at: {createdData}</div><div>fingerprint: {fingerprint}</div>
                <div>name: {name}</div><div>rarity rank: {rarityRank}</div>
                <div>rarity score : {rarityScore}</div>
                <div>rarity rank: {rarityRank}</div>
                <div>statistical rank: {statisticalRank}</div>
                <div>statistical score: {statisticalScore}</div>
                <div>asset name :{token.asset_name}</div>
                <div>policy id: {(token.policy_id).substring(0,9)}...</div></div>);


                // metadata displayed in table
                setMetadata(<MetadataTable json = {token.metadata}/>);
                // nft name
                setTokenName(token.metadata.name);

                // nft image
                setImage(<Image className = "main-img" alt= 'no image' src = {token.ipfs} width = {700} height = {700}/>);
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

      if(tokenMetadata != null){
        let ipfs = token.getIpfsFromMetadata();
        token.ipfs = ipfs;
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
      <div className="token-main">
        <Policy policy = {policy}/>
        <div className="token-name">
            {tokenName}
        </div>
        <div className="token-box">
            <div className="token-image">{image}</div>
            <div className="token-data">{data}</div>
        </div>
        <div className="metadata">{metadata}</div>
    </div>)
}
export default TokenData;
