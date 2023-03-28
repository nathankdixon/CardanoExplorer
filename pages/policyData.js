import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Policy from "./policy";
import PolicyCollection from "./policyCollection";
import PolicyOwned from "./policyOwned";
import Prices from "./prices";
import SearchBar from "./searchbar";
import Token from "./token";
import WalletButton from "./walletButton";

// this component is used to display data for a policy id
// it returns policy information, owned token from policy, and all nfts in collection which can be searched through
function PolicyData (props) {

      // react hook used to store user inputed strings
      const [searchQuery, setSearchQuery] = useState('');
      const [assets, setAssets] = useState(null);
      const [displayedAssets, setDisplayedAssets] = useState([]);
      const [total, setTotal] = useState(0);
      const [minIndex, setMinIndex] = useState(0)
      const [maxIndex, setMaxIndex] = useState(20);
      const [itemPage, setItemPage] = useState(10);
      const [policy, setPolicy] = useState(null);
      const [ipfs, setIpfs] = useState('/black.jpeg');
      const [floor, setFloor] = useState(null);
      const [highestSale, setHighestSale] = useState(null);
      const [volume, setVolume] = useState(null);
      const [supply, setSupply] = useState(null);
      const [holderCount, setHolderCount] = useState(null);
      const [display, setDisplay] = useState([]);

      const router = useRouter();
  
      useEffect(() => {
        async function getAssetPageFromBlockfrost(){
            if(props == null || props.policy == null){
                // do nothing
            }
            else{
                let policy = props.policy;
  
                //setTokens(assets);
  
              let policyData = await getCnftPolicyData(policy);
              let thumbnail = policyData.thumbnail;
              let ipfs = getIpfs(thumbnail);
              let floor = policyData.floor_price;
              let highestSale = policyData.highest_sale;
              let volume = policyData.total_volume;
              let supply = policyData.asset_minted;
              let holderCount = policyData.asset_holders;
              setHighestSale(highestSale);
              setVolume(volume);
              setSupply(supply);
              setHolderCount(holderCount);

              console.log(policyData);
              setIpfs(ipfs);
              setFloor(floor);

              let assets = await loadAllTokenData(policy);

              let display = [];

              for(let i =0; i<20; i++){
                  let assetName = (assets[i].asset).substring(56);
                  let policy = (assets[i].asset).substring(0,56);
                  let quantity = assets[i].quantity;
                  let token = new Token(assetName, policy, quantity);
                  await token.fetchTokenMetadata();
                  display.push(<div className="grid-item-policy" key={token.asset_name}><Image src={token.ipfs} className='policy-img' width = {200} height = {200} alt = {token.asset_name}/></div>);
              }
              setDisplay(display);

            }
        }
        getAssetPageFromBlockfrost()
    }, [policy])

    useEffect(() => {
      if(props.policy != null){
        setPolicy(props.policy);
      }
    }, [props.policy])
  
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
                  if(matches.length != 0){
                      setTotal(matches.length);
                      setDisplayedAssets(<div className="value">{matches.length} matches</div>)
                      let display = []
                      setTotal(matches.length);
                      for(const element of matches){
                      
                      let assetName = (element.asset).substring(56);
                      let policy = (element.asset).substring(0,56);
                      let decodedAsset = Buffer.from(assetName, 'hex').toString();
  
                      
  
                      let token = new Token(assetName, policy, element.quantity);
                      await token.fetchTokenData();
  
                      let ipfs = '/black.jpeg';
  
  
                      let path = 'asset';
  
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
                      setDisplay(display);
  
                  }
                  // no matches
                  else{
                      setTotal(0);
                      setDisplay(<div className="value">No matches</div>)
                  }
  
              }
              // no search query
              else{
                  
              }
          }
          func();
      }, [searchQuery])

      async function getCnftPolicyData(policy){
        try{
          const data = await fetch('https://api.opencnft.io/2/collection/'+policy,
          {headers:{"x-Api-Key": 'ocnft_64230513320ac06596270a21'}});
          const res = await data.json();
  
          return res;
        }catch(error){
          return null;
        }
      }
  
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
        

    // if metadata has been fetched
    // find the ipfs link under 'image' metadata tag and store it
    function getIpfs(ipfs){
      // convert all ipfs formats to the a searchable format that can be fetched in a <img> tag
      try{

        // links are sometimes stored in arrays
        // this finds ipfs links in the array
        if(Array.isArray(ipfs)){
          let newipfs = "";
          for(const element of ipfs){
            newipfs = newipfs + element;
          }
          if(newipfs.startsWith('ba')){
            newipfs = "http://dweb.link/ipfs/"+ipfs;
            newipfs = newipfs.replace(/,/g, '');
          }
          return newipfs;
        }

        // normal ipfs in image tags
        if(ipfs.startsWith('ipfs://')){
          ipfs = ipfs.slice(7);
          if(ipfs.startsWith('ipfs/')){
            ipfs = ipfs.slice(5);
          }
          ipfs = "http://dweb.link/ipfs/"+ipfs;
        }
        else if(ipfs.startsWith('ipfs/')){
          ipfs = ipfs.slice(5);
          ipfs = "http://dweb.link/ipfs/"+ipfs;
        }
        else if(ipfs.startsWith('Qm')){
          ipfs = "http://dweb.link/ipfs/"+ipfs;
        }

      }catch{
        return null;
      }
      return ipfs;
    
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
  

    return(<div>
            <header className="home-header">
              <h1>Cardano Explorer</h1>
              <SearchBar />
              <button className="currency-button">Currency: USD</button>
              <WalletButton />
            </header>
            <div className="policy-data">
              <div className = "policy-item"><Image alt='thumb' className = 'policy-thumbnail' src = {ipfs} width = {200} height = {200}/></div>
              <div className="policy-item">Policy: {props.policy}</div>
              <div className="policy-item-data">
                <div className="policy-item">Floor Price: {floor/1000000} ADA</div>
                <div className="policy-item">Collection Volume: {volume/1000000} ADA</div>
                <div className="policy-item">Supply: {supply}</div>
                <div className="policy-item">Number of Holders: {holderCount}</div>
                </div>
            </div>
            <h1>Collection</h1>
            <div className='grid-nft-policy'>{display}</div>
          </div>)
}
export default PolicyData;
