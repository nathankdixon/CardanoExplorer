import { assetPrefix } from "next.config";
import Image from "next/image";
import { useEffect, useState} from "react";
import MetadataTable from "./metadataTable";
import Policy from "./policy";
import Prices from "./prices";
import Token from "./token";

function TokenData (props) {

  const [ipfs, setIpfs] = useState('/black.jpeg');
  const [metadata, setMetadata] = useState();
  const [data, setData] = useState({name: '', policy:'',created:'', assetName:'', fingerprint:'', rarityRank:'',rarityScore:'',
                              statisticalRank:'', statisticalScore:''});
  const [policy, setPolicy] = useState();
  const [prices, setPrices] = useState();
  const [tokenInfo, setTokenInfo] = useState();

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
                let createdData = (_assetData.created_at).substring(0,10);
                let fingerprint = (_assetData.fingerprint).substring(0,10);
                let name = _assetData.name;
                let rarityRank = _assetData.rarity_rank;
                let rarityScore = _assetData.rarity_score;
                let statisticalRank = _assetData.statistical_rank;
                let statisticalScore = _assetData.statistical_score;

                let obj = {name: name, policy: token.policy_id, created: createdData, assetName: token.asset_name,
                  fingerprint: fingerprint, rarityRank: rarityRank, rarityScore:  rarityScore,
                statisticalRank: statisticalRank, statisticalScore}
                
                setData(obj);

                let price = prices;
                let ipfs = '';
                if(token.metadata != null){
                  ipfs = token.getIpfsFromMetadata();
                  token.ipfs = ipfs;
                }

                let txs = await getPrevTxs(assetId);

                // metadata displayed in table
                setMetadata(JSON.stringify(token.metadata));
                

                if(token.ipfs != null){
                  // nft image
                  setIpfs(token.ipfs);
                }

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

    function setPriceData(data){
      setPrices(data);
    }

    return(
      <div className="token-main">
        <Prices data = {setPriceData}/>
        <Policy policy = {policy} prices = {prices}/>
          <div className="token-box">
              <div className="token-image"><Image className = "main-img" alt= 'no image' src = {ipfs} width = {500} height = {500}/></div>
              <div className="token-data">
                <div className="token-data-item">
                Name: {data.name}
                </div>
                <div className="token-data-item">
                Created: {data.created}
                </div>
                <div className="token-data-item">
                Fingerprint: {data.fingerprint}
                </div>
                <div className="token-data-item">
                Rarity Rank: {data.rarityRank}
                </div>
                <div className="token-data-item">
                Statistical Rank: {data.statisticalRank}
                </div>
                <div className="token-data-item">
                Asset Name: {data.assetName}
                </div>
              </div>
        </div>
        <div className="metadata">Metadata: <br/>{metadata}</div>


    </div>)
}
export default TokenData;
