import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Token from "./token";

// takes a policy and uses blockfrost to return asset datafrom the collection
export default function Collection(props){

    const [display, setDisplay] = useState();
    const [tokens, setTokens] = useState();
    const [minItems, setMinItems] = useState(0);
    const [maxItems, setMaxItems] = useState(10);

    const router = useRouter();

    useEffect(() => {
        async function getAssetPageFromBlockfrost(){
            if(props ==null){
                // do nothing
            }
            else{
                let policy = props.policy;

                let assets = [];

                let assets1 = await loadTokenData(policy, 1);

                let assets2 = await loadTokenData(policy, 2);

                if(assets1 == assets2){
                    assets = assets1;
                }
                else{
                    assets.push(assets1);
                    assets.push(assets2);
                }

                setTokens(assets);
            }
        }
        getAssetPageFromBlockfrost()
    }, [props])

    useEffect(() => {
        async function func () {
            if(tokens != null){
                let display = [];
                for(let i=minItems; i<maxItems; i++){
                    let assetId = tokens[0][i].asset;
                    let policy = assetId.substring(0,56);
                    let assetName = assetId.substring(56);

                    let token = new Token(assetName, policy, tokens[0][i].quantity);
                    token.metadata = await token.getMetadata();

                    let decryptName = Buffer.from(assetName, 'hex').toString();


                    let ipfs = '/black.jpeg';
                    if(token.metadata != null){
                        token.ipfs = token.getIpfsFromMetadata();
                        ipfs = token.ipfs;
                    }

                    display.push(        
                    <div key={token.asset_name + 'nft'} className="grid-item">
                    <Image
                      className="grid-img"
                      src={ipfs}
                      alt="failed to load image"
                      width={270}
                      height={270}
                      onClick={() => router.push('/token/' + token.policy_id + token.asset_name+'?stake='+props.stake)}
                    />
                      <div className="grid-item-text">{decryptName}
                    </div>
                        <div className="grid-item-text">
                            Asset Name: {assetName.substring(0, 7)}...
                            <button
                            className="policy-button"
                            onClick={(e) => copyText(e, assetName)}
                            >
                            Copy
                        </button>
                    </div>
                  </div>);
                }

                setDisplay(display);
            }
        }
        func();
    }, [tokens, minItems])

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

    // fetch token metadata from blockfrost
    async function loadTokenData(policy, page){
        try{
            const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/'+policy+'?page'+page,
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

    function nextPage(){
        setMinItems(minItems + 10);
        setMaxItems(maxItems + 10);
    }

    return (<div>
        <button className="setting-button" onClick={nextPage}>Next</button><label>Collection</label>
        <div className="grid-nft">{display}</div>
        </div>)
}