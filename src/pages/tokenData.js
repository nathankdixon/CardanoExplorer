import Image from "next/image";
import { useEffect, useState } from "react";
import MetadataTable from "./metadataTable";
import Prices from "./prices";
import Token from "./token";

function TokenData (props) {

    const [tokenData, setTokendata] = useState();

    const [metadata, setMetadata] = useState();
    const [floorPrice, setFloorPrice] = useState();
    const [volume, setVolume] = useState();
    const [holderCount, setHolderCount] = useState();
    const [image, setImage] = useState();
    const [currency, setCurrency] = useState({name: 'ada',value: 1, symbol: '₳'});

    const [prices, setPrices] = useState(null);

    useEffect(() => {
        const getTokenData = async () => {
          if(props == null){
            console.log('tokenID was undefined');
          }
          else{

            if(prices != null){
              let tokenId = props.tokenId;
              console.log(prices);
  
              let currency = prices.currency;
              setCurrency(currency);
              let _tokenData = await loadTokenData(tokenId);
              const token = new Token(_tokenData.asset_name, _tokenData.policy_id , _tokenData.quantity);
              token.metadata = await token.getMetadata();
              let _policyData = await loadPolicyData(token.policy_id);
              setFloorPrice(((_policyData.floor_price/1000000) * currency.value).toFixed(2));
              setVolume(((_policyData.total_volume/1000000) * currency.value).toFixed(2));
              setHolderCount(_policyData.asset_holders);
              const meta = token.metadata;
              const keys = Object.keys(meta);
              const _ipfs = await token.getIpfsFromMetadata();
              setImage(<Image className = "main-img" alt= 'no image' src = {_ipfs} width = {700} height = {700}/>);
              setTokendata(meta.name);
              setMetadata(<MetadataTable json = {meta}/>);
            }

          }
        }
        getTokenData();
      }, [props])

      useEffect(() => {
        const getTokenData = async () => {
          if(props == null){
            console.log('tokenID was undefined');
          }
          else{

            if(prices != null){
              let tokenId = props.tokenId;
              console.log(prices);
  
              let currency = prices.currency;
              setCurrency(currency);
              let _tokenData = await loadTokenData(tokenId);
              const token = new Token(_tokenData.asset_name, _tokenData.policy_id , _tokenData.quantity);
              token.metadata = await token.getMetadata();
              let _policyData = await loadPolicyData(token.policy_id);
              setFloorPrice(((_policyData.floor_price/1000000) * currency.value).toFixed(2));
              setVolume(((_policyData.total_volume/1000000) * currency.value).toFixed(2));
              setHolderCount(_policyData.asset_holders);
              const meta = token.metadata;
              const keys = Object.keys(meta);
              const _ipfs = await token.getIpfsFromMetadata();
              setImage(<Image className = "main-img" alt= 'no image' src = {_ipfs} width = {700} height = {700}/>);
              setTokendata(meta.name);
              setMetadata(<MetadataTable json = {meta}/>);
            }
          }
        }
        getTokenData();

      }, [prices])

    async function loadTokenData(tokenId){
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+tokenId,
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

    function setPriceData(data){
      setPrices(data);
    }


    return(
    <div className="token-main">
      <Prices data = {setPriceData} tokens={{stake: props.stake}}/>
        <div className="token-name">
            {tokenData}
        </div>
        <div className="policyData">
            <div className="policy-item">Floor Price: <div className="value">{floorPrice}<div className="currency">{currency.symbol}</div></div></div>
            <div className="policy-item">Collection Volume : <div className="value">{volume}<div className="currency">{currency.symbol}</div></div></div>
            <div className="policy-item">Number of Holders: <div className="value">{holderCount}</div></div>
        </div>
        <div className="token-box">
            <div className="token-image">{image}</div>
            <div className="metadata">
                {metadata} </div>
        </div>
    </div>)
}
export default TokenData;
