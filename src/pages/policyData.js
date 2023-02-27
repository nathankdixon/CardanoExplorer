import { useEffect, useState } from "react";
import NftGrid from "./nftGrid";
import Token from "./token";

function PolicyData (props) {

    const [policy, setPolicy] = useState();
    const [tokens, setTokens] = useState();


    useEffect(() => {
        const getPolicyData = async () => {
          if(props.policy == null){
            console.log('policy was undefined');
          }
          else{
            let tokens = [];
            console.log(props.stake);
            // fetch asset data from blockfrost
            let policyData = await loadTokenData(props.policy);

            if(policyData != null){
                for(let i =0; i< policyData.length;i++){
                    let data = policyData[i];
                    let assetID = data.asset;
                    let policy = (assetID).substring(0,56);
                    let assetName = (assetID).substring(56);
                    let quantity = data.quantity;

                    setPolicy(policy);

                    if(policy != null && assetName != null){
                        let token = new Token(assetName, policy, quantity);
                        let metadata = await token.getMetadata();
                        token.metadata = metadata;

                        if(metadata != null){
                            let ipfs = token.getIpfsFromMetadata();
                            token.ipfs = ipfs;
                        }
                        tokens.push(token);
                    }
                }
            }
            else{
                setPolicy('couldnt fetch data');
                
            }

            setTokens(tokens);

          }
        }
        getPolicyData();
      }, [props])

    // fetch token metadata from blockfrost
    async function loadTokenData(policy){
      try{
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/'+policy+'?count=20',
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

    return(<div>
        <div className="main">{policy}</div>
        <NftGrid nfts = {tokens}/>
    </div>)
}
export default PolicyData;
