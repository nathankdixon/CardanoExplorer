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
                              statisticalRank:'', statisticalScore:'', assetId:''});
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
                let fingerprint = (_assetData.fingerprint);
                let assetName = _assetData.name;
                let rarityRank = _assetData.rarity_rank;
                let rarityScore = _assetData.rarity_score;
                let statisticalRank = _assetData.statistical_rank;
                let statisticalScore = _assetData.statistical_score;


                let decryptName = Buffer.from(token.asset_name, 'hex').toString();
                console.log(decryptName);


                let obj = {name: decryptName, policy: token.policy_id, created: createdData, assetName: token.asset_name,
                  fingerprint: fingerprint, rarityRank: rarityRank, rarityScore:  rarityScore,
                statisticalRank: statisticalRank, statisticalScore, assetId: assetId};
                
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

      function copyText(event, text) {
        navigator.clipboard.writeText(text).then(() => {
          // Update the button text to "Copied!"
          const button = event.target;
          event.target.innerText = "Copied";
          setTimeout(() => {
            // Reset the button text after 1 second
            button.textContent = "Copy";
          }, 1000);
        });
      }
      


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
                Name: <div className="value">{data.name}</div>
                </div>
                <div className="token-data-item">
                Created: <div className="value">{data.created}</div>
                </div>
                <div className="token-data-item">
                Asset Id: <div className="value">{(data.assetId).substring(0,10)}...</div>
                <button
                  className="policy-button"
                  onClick={(e) => copyText(e, data.assetId)}
                >
                  Copy
                </button>
              </div>

                <div className="token-data-item">
                Rarity Rank: <div className="value">{data.rarityRank}</div>
                </div>
                <div className="token-data-item">
                Statistical Rank: <div className="value">{data.statisticalRank}</div>
                </div>
                <div className="token-data-item">
                Fingerprint: <div className="value">{(data.fingerprint).substring(0,15)}...</div>
                <button
                  className="policy-button"
                  onClick={(e) => copyText(e, data.fingerprint)}
                >
                  Copy
                </button>
                </div>

              </div>
        </div>
        <div className="metadata">Metadata: <br/>{metadata}</div>


    </div>)
}
export default TokenData;
