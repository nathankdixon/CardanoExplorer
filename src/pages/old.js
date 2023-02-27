import { assetPrefix } from "next.config";
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
            console.log('asset ID was undefined');
          }
          else{
            if(prices != null){
              // from url in [token].js
              let assetId = props.assetId;
              
              // current selected currency
              let currency = prices.currency;
              setCurrency(currency);

              // fetch asset data from blockfrost
              let _tokenData = await loadTokenData(assetId);

              if(_tokenData != null){
                const token = new Token(_tokenData.asset_name, _tokenData.policy_id , _tokenData.quantity);
                let meta = await token.getMetadata();

                if(meta != null){
                  token.metadata = meta;
                  const keys = Object.keys(meta);

                  // metadata displayed in table
                  setMetadata(<MetadataTable json = {meta}/>);

                  // nft name
                  setTokendata(meta.name);
                }
                const _ipfs = await token.getIpfsFromMetadata();

                // nft image
                setImage(<Image className = "main-img" alt= 'no image' src = {_ipfs} width = {700} height = {700}/>);

                // fetch collection data from openCNFT
                let _policyData = await loadPolicyData(token.policy_id);

                if(_policyData != null){
                  setFloorPrice(((_policyData.floor_price/1000000) * currency.value).toFixed(2));
                  setVolume(((_policyData.total_volume/1000000) * currency.value).toFixed(2));
                  setHolderCount(_policyData.asset_holders);
                }

              }
              else{
                
              }

            }

          }
        }
        getTokenData();
      }, [props, prices])


    // fetch token metadata from blockfrost
    async function loadTokenData(assetId){
      try{
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+assetId,
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
        const res = await data.json();
        return res;
      }catch(error){
        return null;
      }

      }
      
    // fetch collection data from openCNFT by poliy Id
    async function loadPolicyData(policy){
      try{
        const data = await fetch('https://api.opencnft.io/1/policy/'+policy,
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
        const res = await data.json();
        return res;
      }catch(error){
        return null;
      }

    }

    // price component callback
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
