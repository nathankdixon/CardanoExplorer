import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Token from "./token";

// takes a policy and uses blockfrost to return asset datafrom the collection
export default function PolicyCollection(props){

    // react hook used to store user inputed strings
    const [searchQuery, setSearchQuery] = useState('');
    const [assets, setAssets] = useState(null);
    const [displayedAssets, setDisplayedAssets] = useState([]);
    const [total, setTotal] = useState(0);
    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(20);

    const router = useRouter();


    useEffect(() => {
        async function func(){
            let matches = [];
            if(assets != null && searchQuery == ''){

            }
            if(searchQuery.length >0 && assets != null){
                let decodedAsset = '';
    
                // find matches
                for(const element of assets){
                    let assetName = (element.asset).substring(56);
                    decodedAsset = Buffer.from(assetName, 'hex').toString();

                    let assetId = (element.asset).toLowerCase();
                    let assetNameL = assetName.toLowerCase();
                    let decodedAssetL = decodedAsset.toLowerCase();

                    if((assetId).includes(searchQuery) || decodedAssetL.includes(searchQuery) || assetNameL.includes(searchQuery)){
                        matches.push((element));
                    }
    
                }
                // display matches
                if(matches.length != 0 && matches.length >20){
                    setTotal(matches.length);
                    setDisplayedAssets(<div className="value">{matches.length} matches</div>)

                }
                else if(matches.length <20){
                    let display = []
                    setTotal(matches.length);
                    for(const element of matches){
                    
                    let assetName = (element.asset).substring(56);
                    let policy = (element.asset).substring(0,56);
                    let decodedAsset = Buffer.from(assetName, 'hex').toString();

                    

                    let token = new Token(assetName, policy, element.quantity);
                    token.metadata = await token.getMetadata();

                    let ipfs = '/black.jpeg';

                    if(token.metadata != null){
                        token.ipfs = token.getIpfsFromMetadata();
                        if(token.ipfs != null){
                            ipfs = token.ipfs;
                        }
                    }
                    let path = 'token';

                    display.push(
                    <div key = {token.asset_name + 'poly'} className = "grid-item" 
                    onClick={() => router.push('/'+path+'/'+token.policy_id+token.asset_name+'?stake='+props.stake)}>
                        <Image className="grid-img" src= {ipfs} alt = 'failed to load image' width={270} height={270}/>
                            <div className="grid-item-text" style={{fontWeight: "bolder"}}>
                                {decodedAsset}
                            </div>
                            <div className="grid-item-text">
                                <button className="policy-button" onClick={(e) => copyText(e, token.asset_name)}>Copy</button>
                                <Link className = 'policy-button' href={'https://www.jpg.store/asset/'+element.asset}>JPG.store</Link>
                            </div>   
     
                  </div>);
                    }

                    setDisplayedAssets(display);

                }
                // no matches
                else{
                    setTotal(0);
                    setDisplayedAssets(<div className="value">No matches</div>)
                }

            }
            // no search query
            else{
                
            }
        }
        func();
    }, [searchQuery])


    useEffect(() => {
        async function getAssetPageFromBlockfrost(){
            if(props == null || props.policy == null){
                // do nothing
            }
            else{
                let policy = props.policy;

                //setTokens(assets);

                let allAssets = await loadAllTokenData(policy);

                setAssets(allAssets);
                setTotal(allAssets.length);
            }
        }
        getAssetPageFromBlockfrost()
    }, [props])


    useEffect(() => {
        async function setDisplay(){
            if(assets != null){

                let display = [];
                for(let i = minIndex; i <maxIndex; i++){

                    let assetName = (assets[i].asset).substring(56);
                    let policy = (assets[i].asset).substring(0,56);
                    let decodedAsset = Buffer.from(assetName, 'hex').toString();


                    let token = new Token(assetName, policy, assets[i].quantity);
                    token.metadata = await token.getMetadata();

                    let ipfs = '/black.jpeg';

                    if(token.metadata != null){
                        token.ipfs = token.getIpfsFromMetadata();
                        if(token.ipfs != null){
                            ipfs = token.ipfs;
                        }
                    }
                    let path = 'token';

                    if(assetName != ''){
                      display.push(
                        <div key = {token.asset_name + 'poly'} className = "grid-item" onClick={() => router.push('/'+path+'/'+token.policy_id+token.asset_name+'?stake='+props.stake)}>
                            <Image className="grid-img" src= {ipfs}
                            alt = 'failed to load image' width={270} height={270}/>
                            <div className="grid-item-info">
                            <div className="grid-item-text" style={{fontWeight: "bolder"}}>
                                {decodedAsset}
                             </div>
                            <div className="grid-item-text">
                              <button
                                className="policy-button"
                                onClick={(e) => copyText(e, token.asset_name)}
                              >
                                Copy
                              </button>
                              <Link className = 'policy-button' href={'https://www.jpg.store/asset/'+assets[i].asset}>JPG.store</Link>
            
                            </div>
                        </div>
                      </div>);
                    }


                }
                setDisplayedAssets(display);
            }
        }
        setDisplay();
    }, [assets, minIndex, maxIndex])

    async function loadAllTokenData(policy) {
        let page = 1;
        let allData = [];
      
        while (true) {
          const data = await loadTokenData(policy, page);
          if (!data) {
            // handle error
            break;
          }
          allData = allData.concat(data);
      
          if (data.length === 0) {
            // we've reached the last page
            break;
          }
          
          // increment page
          page++;
        }
      
        return allData;
      }
      

      
    // fetch token metadata from blockfrost
    async function loadTokenData(policy, page){
        try{
            const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/'+policy+'?page='+page,
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
        let mindex = minIndex +20;
        let maxdex = maxIndex +20;

        setMinIndex(mindex);
        setMaxIndex(maxdex);
    }
      

      return (
        <div>
          <label>Collection</label><label>Showing results: {maxIndex} of {total}</label>
          <div className="policy-search">
            <button className="setting-button" onClick={() => nextPage()}>
              Next
            </button>
            <form className="searchForm">
              <input
                type="text"
                className="search-input"
                placeholder="Search in collection by Asset ID, Asset Name or Asset Name decoded..."
                value={searchQuery}
                onChange={(event) => setSearchQuery((event.target.value).toLowerCase())}
              />
            </form>
          </div>
      
          <div className="grid-nft">{displayedAssets}</div>
        </div>
      );
      
}