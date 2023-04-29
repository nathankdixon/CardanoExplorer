import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import Token from "./token";
import WalletButton from "./walletButton";
import Link from "next/link";

// this component is used to display data for a policy id
// it returns policy information, owned token from policy, and all nfts in collection which can be searched through
function PolicyData (props) {

      // react hook used to store user inputed strings

      const [policy, setPolicy] = useState(null);
      const [display, setDisplay] = useState([]);
      const [policyData, setPolicyData] = useState({
                                                    policy: '', 
                                                    thumbnail: '/black.jpeg', 
                                                    floor_price: 1, 
                                                    highest_sale: {asset_name: '', name: '', price: 1}, 
                                                    total_volume: 1, 
                                                    asset_minted: 1, 
                                                    asset_holders: 1});
      const [assets, setAssets] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [itemLimit, setItemLimit] = useState(30);
      const [loadedItems, setLoadedItems] = useState([]);


      const router = useRouter();

      useEffect(() => {
        async function getAssetPageFromBlockfrost(){
            if(props.policy == null || policy == null){
                // do nothing
            }
            else{
                let policy = props.policy;
                let policyData = await getPolicyData(policy);
                setPolicyData(policyData);
                setDisplay(<div>Fetching Assets</div>)

                let assetsList = [];
                if(policyData.asset_minted < 10000){
                  assetsList = await loadAllTokenData(policy);
                }
                else{
                  assetsList = await loadTokenData(policy, 1);
                }
                let tokens = [];
                for(const element of assetsList){
                  let assetId = element.asset;
                  let policyId = assetId.substring(0, 56);
                  let assetName = assetId.substring(56);
                  let token = new Token(assetName, policyId, element.quantity);
                  tokens.push(token);
                }
                setAssets(tokens);

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
      setItemLimit(30);
    }, [searchTerm]);
    

    useEffect(() => {
      async function displayAssets() {
        if (assets.length === 0) {
          return;
        } else {    
          if (searchTerm === "") {
            setDisplay([]);
            for (let i = loadedItems.length; i < Math.min(assets.length, itemLimit); i++) {
              await addItem(assets[i], i);
            }
          } else {
            const filteredAssets = assets.filter(asset =>
              asset.decoded_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log(filteredAssets);
    
            if (filteredAssets.length === 0) {
              setDisplay(<div>No Assets Found</div>);
            } else if (filteredAssets.length === 1) {
              let token = new Token(filteredAssets[0].asset_name, filteredAssets[0].policy_id, filteredAssets[0].quantity);
              await token.fetchTokenMetadata();

              let itemToAdd = (<div
                className="grid-item-policy"
                onClick={() => router.push('/' + token.policy_id + token.asset_name)}
              >
                <Image src={token.ipfs} height={200} width={200} alt={token.decoded_name} />
                <div>{token.decoded_name}</div>
              </div>)
              setDisplay(<div>{itemToAdd}</div>

              );
            } else {
              setDisplay(<div>Results: {filteredAssets.length}</div>);
            }
          }
        }
      }
      displayAssets();
    }, [assets, searchTerm, itemLimit]);

    async function addItem(asset, index) {
      let token = new Token(asset.asset_name, asset.policy_id, asset.quantity);
      await token.fetchTokenMetadata();
  
      let newItem = (
        <div
          className="grid-item-policy"
          key={index}
          onClick={() => router.push("/" + token.policy_id + token.asset_name)}
        >
          <Image src={token.ipfs} height={200} width={200} alt={token.decoded_name} />
          <div>{token.decoded_name}</div>
        </div>
      );
  
      setLoadedItems((prevItems) => [...prevItems, newItem]);
      console.log("loaded " + token.decoded_name);
    }

    function loadMoreItems() {
      setItemLimit(prevLimit => prevLimit + 30);
    }
    
    
    async function getPolicyData(policy){
      let policyData = await getCnftPolicyData(policy);
      let thumbnail = policyData.thumbnail;
      let ipfs = getIpfs(thumbnail);
      let floor = policyData.floor_price;
      let highestSale = policyData.highest_sale;
      let volume = policyData.total_volume;
      let supply = policyData.asset_minted;
      let holderCount = policyData.asset_holders;
      let data = {thumbnail: ipfs, floor_price: floor, highest_sale: highestSale, total_volume: volume, asset_minted: supply, asset_holders: holderCount};
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

    return(<div>
            <header className="home-header">
              <div className="main-title">Cardano Explorer</div>
              <SearchBar/>
              <WalletButton/>
            </header>
            <div className="policy-data">
            <div className="policy-item-stat">Policy:<span className="policy-id">{props.policy}</span></div>
                <Image alt='thumb' className = 'policy-item' src = {policyData.thumbnail} width = {200} height = {200}/>
                <div className="policy-stat-container">
                  <div className="policy-item-stat">Floor Price: <span className="policy-value">{policyData.floor_price/1000000} ADA</span></div>
                  <div className="policy-item-stat">Trading Volume: <span className="policy-value">{(policyData.total_volume/1000000).toFixed(2)} ADA</span></div>
                  <div className="policy-item-stat">Supply: <span className="policy-value">{policyData.asset_minted}</span></div>
                  <div className="policy-item-stat">Number of Holders: <span className="policy-value">{policyData.asset_holders}</span></div>
                </div>
            </div>
            <div className="policy-grid">
              <nav className="policy-nav"><div style={{fontSize: '25px'}}>Explore Collection</div>
                <input
                  type="search"
                  placeholder="Search by asset name"
                  value={searchTerm}
                  className='search-policy'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </nav>
              <div className="policy-search-results">{display}</div>
              <div className="grid-nft-policy">
                {loadedItems}
                {itemLimit < assets.length && (
                  <button onClick={loadMoreItems} className="show-button">
                    Show more
                  </button>
                )}
              </div>
            </div>
          </div>)
}
export default PolicyData;
