import Image from "next/image";
import Link from "next/link";
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

      const [policy, setPolicy] = useState(null);
      const [display, setDisplay] = useState([]);
      const [tokensPerPage, setTokensPerPage] = useState(25);
      const [currentIndex, setCurrentIndex] = useState(0);


      const [policyData, setPolicyData] = useState({assets: [], 
                                                    tokens: [],   
                                                    policy: '', 
                                                    thumbnail: '/black.jpeg', 
                                                    floor_price: 1, 
                                                    highest_sale: {asset_name: '', name: '', price: 1}, 
                                                    total_volume: 1, 
                                                    asset_minted: 1, 
                                                    asset_holders: 1});

      const router = useRouter();
  
      useEffect(() => {
        async function getAssetPageFromBlockfrost(){
            if(props.policy == null || policy == null){
                // do nothing
            }
            else{
                let policy = props.policy;
                let policyData = {};
                
                
                setDisplay(<h1>Loading Tokens</h1>);
                //setTokens(assets);

                if(localStorage.getItem(policy) != null){
                  policyData = JSON.parse(localStorage.getItem(policy));
                }
                else{
                  policyData = await getPolicyData(policy);
                  try{
                    localStorage.setItem(policy, JSON.stringify(policyData));
                  }
                  catch(e){
                    console.log(e);
                  }

                }

                setPolicyData(policyData);
                console.log(policyData);
            }
        }
        getAssetPageFromBlockfrost()
    }, [policy])

    useEffect(() => {
      if(props.policy != null){
        setPolicy(props.policy);
      }
    }, [props.policy])

    async function getPolicyData(policy){
      let policyData = await getCnftPolicyData(policy);
      let thumbnail = policyData.thumbnail;
      let ipfs = getIpfs(thumbnail);
      let floor = policyData.floor_price;
      let highestSale = policyData.highest_sale;
      let volume = policyData.total_volume;
      let supply = policyData.asset_minted;
      let holderCount = policyData.asset_holders;

      setPolicyData({assets: [], tokens: [], policy: policy, thumbnail: ipfs, floor_price: floor, highest_sale: highestSale, total_volume: volume, asset_minted: supply, asset_holders: holderCount});

      let assets = await loadAllTokenData(policy);

      let maxTokensToGenerate = 75;
      if(assets.length < maxTokensToGenerate){
        maxTokensToGenerate = assets.length;
      }

      let tokens = [];

      for(let i = 0; i < maxTokensToGenerate; i++){
        let asset = assets[i];

        let assetName = asset.asset.substring(56);
        let quantity = asset.quantity;
        let token = new Token(assetName, props.policy, quantity);
        await token.fetchTokenMetadata();
        tokens.push(token);
      }

      let data = {assets: assets, tokens: tokens, thumbnail: ipfs, floor_price: floor, highest_sale: highestSale, total_volume: volume, asset_minted: supply, asset_holders: holderCount};
      return data;
    }

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

      const handleClick = (e, href) => {
        e.preventDefault();
        router.push(href);
      };

      useEffect(() => {
        showTokens(0, 25);
      }, [policyData])

      function showTokens(index, tokensPerPage){
        if(policyData != null){

          let tokens = policyData.tokens;
          let display = [];
          for(let i = index; i < tokensPerPage; i++){
            let token = tokens[i];
            if(token){
              display.push(<Link key = {token.asset_name} className="grid-item-policy" href={'/'+token.policy_id + token.asset_name} onClick={() => router.push('/'+token.policy_id+token.asset_name)}>
                <Image src={token.ipfs} width= {200} height = {200} alt = 'no-img'/><label>{token.decoded_name}</label></Link>)

            }
          }
          setDisplay(display);
        }
      }

      function next(){

        
        let index = currentIndex + 25;

        if(index >= policyData.tokens.length){
          index = 0;
          setCurrentIndex(0);
        }

        showTokens(index, index+25);
        setCurrentIndex(index);
      }

      function prev(){
        let index = currentIndex - 25;

        if(index < 0){
          index = policyData.tokens.length - 25;
          setCurrentIndex(index);
        }

        showTokens(index, index+25);
        setCurrentIndex(index);
      }

      function deleteLocalStorage(){
        localStorage.removeItem(props.policy);
        router.reload();
        window.location.reload();
      }

      function clearLocalStorage(){
        localStorage.clear();
        window.location.reload();
        router.reload();
      }



    return(<div>
            <header className="home-header">
              <h1>Cardano Explorer</h1>
              <SearchBar />
              <button onClick={clearLocalStorage} className="refresh-button">Clear</button>
              <button onClick={deleteLocalStorage} className="refresh-button"><Image src={'/refresh.png'} className='arrow'width = {30} height={30} alt='refresh wallet'/></button>
              <button className="currency-button">Currency: USD</button>
              <WalletButton />
            </header>
            <div className="policy-info">
              <h1>Policy Information</h1>
              <div className="policy-data">
              <Image alt='thumb' className = 'policy-item' src = {policyData.thumbnail} width = {150} height = {150}/>
                <div className="policy-item-data">
                  <div className="policy-item-policy">Policy:<Link href = {'/'+props.policy}>{props.policy}</Link></div>
                  <div className="policy-item-container">
                    <div className="policy-item-stat">Floor Price: {policyData.floor_price/1000000} ADA</div>
                    <div className="policy-item-stat">Volume: {policyData.total_volume/1000000} ADA</div>
                    <div className="policy-item-stat">Supply: {policyData.asset_minted}</div>
                    <div className="policy-item-stat">Number of Holders: {policyData.asset_holders}</div>
                  </div>
                  </div>
              </div>
            </div>
            <div className="policy-grid">
              <nav><h1>Explore Collection</h1><form><input></input></form><label>Showing items : {currentIndex+25} of {policyData.tokens.length}</label><button className = 'page-button' onClick = {() => prev()}>Prev</button><button className = 'page-button' onClick = {() => next()}>Next</button></nav>
              <div className='grid-nft-policy'>{display}</div>
            </div>
          </div>)
}
export default PolicyData;
