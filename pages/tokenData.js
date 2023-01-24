import { useEffect, useState } from "react";
import MetadataTable from "./metadataTable";
import Token from "./token";

function TokenData ({tokenId}) {

    const [tokenData, setTokendata] = useState();
    const [policyData, setPolicyData] = useState();
    const [metadata, setMetadata] = useState();
    const [floorPrice, setFloorPrice] = useState();
    const [volume, setVolume] = useState();
    const [holderCount, setHolderCount] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const getTokenData = async () => {
          if(tokenId == null){
            console.log('tokenID was undefined');
          }
          else{
            let _tokenData = await loadTokenData(tokenId);
            const token = new Token(_tokenData.asset, _tokenData.quantity);
            token.metadata = await token.getMetadata();
            let _policyData = await loadPolicyData(token.policyId);

            setFloorPrice(Math.round(_policyData.floor_price/1000000)+'₳');
            setVolume(Math.round(_policyData.total_volume/1000000)+'₳');
            setHolderCount(_policyData.asset_holders);
            const meta = token.metadata;
            const keys = Object.keys(meta);
            console.log(keys);
            const _ipfs = await token.getIpfsFromMetadata();
            setImage(<img className = "main-img"src = {_ipfs}></img>);
            setTokendata(meta.name);
            setMetadata(<MetadataTable json = {meta}/>);
          }
        }
        getTokenData();
      }, [tokenId])

    async function loadTokenData(unit){
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+unit,
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
        const res = await data.json();
        return res;
      }
      
    async function loadPolicyData(policy){
      const data = await fetch('https://api.opencnft.io/1/policy/'+policy,
      {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
      const res = await data.json();
      return res;
    }

    return(
    <div>
        <h2 className="token-name">
            {tokenData}
        </h2>
        <div className="policyData">
            <p className="policy-item">Floor Price: {floorPrice}</p>
            <p className="policy-item">Collection Volume : {volume}</p>
            <p className="policy-item">Number of Holders: {holderCount}</p>
        </div>
        <div className="token-box">
            <div className="token-image">{image}</div>
        </div>
        <h3 className="token-name">Metadata</h3>
        <div className="metadata">
                {metadata}
        </div>

    </div>)
}
export default TokenData;
