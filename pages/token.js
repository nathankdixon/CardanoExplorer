export default class Token{

    // nfts and fts are of type token and have these three attributes
    // when list of assets in wallet is fetched, only simple metadata is paired
    constructor(asset_name, policy_id, quantity){
        this.asset_name = asset_name;
        this.policy_id = policy_id;
        this.quantity = quantity; 
    }

    // fetches token metadata from asset id
    // is customised by the author according to metadata standards
    async getMetadata(){
      try{

        // fetch asset metadata from blockfrost using concat of policy and name
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+this.policy_id+this.asset_name,
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});


        // some nft authors use the 'metadata' tag to store metadata
        // 'on_chain_metadata' is also used instead
        let response = await data.json();
        if(response != null){
          if(response.onchain_metadata != null){
            this.metadata = response.onchain_metadata;
            return response.onchain_metadata;
          }
          else if(response.metadata != null){
            this.metadata = response.metadata;
            return response.metadata;
          }
          else{
            return null;
          }
        }
        else{
          return null;
        }
      }catch(error){
        return null;
      }
        
    }

    // if metadata has been fetched
    // find the ipfs link under 'image' metadata tag and store it
    getIpfsFromMetadata(){
      const keys = Object.keys(this.metadata);
      const values = Object.values(this.metadata);
      let ipfs = "";
      for(let i=0;i<keys.length;i++){


        if(keys[i] == "image"){
          ipfs = values[i];
        }
        
        // fungible tokens will have a 'logo' instead of 'image' tag
        if(keys[i] == "logo"){
          ipfs = "data:image/png;base64,"+values[i]
        }
      }

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

        // returns price data for the token from coin gecko
    // if available
    async getPrice(){

      // coin ids fetched from downloaded json 
      let request = await fetch('/coin-gecko.json');
      let geckoData = await request.json();
      let ticker = '';

      // get ticker to find id in json doc
      try{
        ticker = this.metadata.ticker;
      }catch(error){
        ticker = null;
      }

      // match ticker to id
      if(ticker != null){
        let foundGeckoCoin  = geckoData.find(item => item.symbol == ticker.toLowerCase());
        if(foundGeckoCoin != null){
          this.id = foundGeckoCoin.id;
        }
        else{
          this.id = null;
        }
      }

      // if found id, then price data exists on coin gecko
      // fetch price data to be used in Fts
      let prices = '';
      if(this.id != null){
        let req = await fetch('https://api.coingecko.com/api/v3/coins/'+this.id);
        let res = await req.json();
        
        // get price data and price change data
        // used in fts
        if(res.asset_platform_id == 'cardano'){
          let _currentPrice = res.market_data.current_price.usd.toFixed(2);
          let _24change = res.market_data.price_change_percentage_24h.toFixed(2);
          let _7dchange = res.market_data.price_change_percentage_7d.toFixed(2);
          let _30dchange = res.market_data.price_change_percentage_30d.toFixed(2);
          let _1ychange = res.market_data.price_change_percentage_1y.toFixed(2);
          this.prices = {current : _currentPrice, change24h: _24change, change7d: _7dchange,
                    change30d : _30dchange, change1y: _1ychange};
        }
      }
      else{
        this.prices = null;
      }
      return this.prices;
    }
}



