import { useEffect, useState} from "react";
import Token from "./token";
import TokenDisplay from "./tokenDisplay";

// this function fetches token data from blockfrost and market data from opencnft
// data is then passed to TokenDisplay to be displayed
function AssetData (props) {

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

                
                let assetTxData = await getAssetTxData(assetId);
                let txHash = assetTxData[0].tx_hash;

                let txData = await getTxData(txHash);
                console.log(txData)

              
                let decryptName = Buffer.from(token.asset_name, 'hex').toString();
                
                let data = {token: token, assetId: assetId, name: decryptName, created: createdData,
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
      token.fetchTokenData();
      return token;
    }

    async function getTxData(txHash){
      try{
        let req = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/txs/'+txHash+'/utxos',
        {headers: {project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});

        let res = await req.json();

        if(req.status != 200){
          return null;
        }
        else{
          return res;
        }
      }catch(error){
        return null;
      }
    }

    async function getAssetTxData(assetId){
      try{    
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+assetId+'/transactions?order=desc',
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});

        const res = await data.json();
        if(data.status != 200){
          return null;
        }
        else{
          return res;
        }
      }catch(error){
        return null;
      }
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
export default AssetData;
