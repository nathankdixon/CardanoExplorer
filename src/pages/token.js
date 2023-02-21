export default class Token{

    constructor(asset_name, policy_id, quantity){
        this.asset_name = asset_name;
        this.policy_id = policy_id;
        this.quantity = quantity; 
    }

    async getPrice(){

      let request = await fetch('/coin-gecko.json');
      let geckoData = await request.json();
      let ticker = '';

      try{
        ticker = this.metadata.ticker;
      }catch(error){
        ticker = null;
      }

      if(ticker != null){
        let foundGeckoCoin  = geckoData.find(item => item.symbol == ticker.toLowerCase());
        if(foundGeckoCoin != null){
          this.id = foundGeckoCoin.id;
        }
        else{
          this.id = null;
        }
      }

      let prices = '';
      if(this.id != null){
        let req = await fetch('https://api.coingecko.com/api/v3/coins/'+this.id);
        let res = await req.json();
        
        if(res.asset_platform_id == 'cardano'){
          let _currentPrice = res.market_data.current_price.usd.toFixed(2);
          let _24change = res.market_data.price_change_percentage_24h.toFixed(2);
          let _7dchange = res.market_data.price_change_percentage_7d.toFixed(2);
          let _30dchange = res.market_data.price_change_percentage_30d.toFixed(2);
          let _1ychange = res.market_data.price_change_percentage_1y.toFixed(2);
          prices = {current : _currentPrice, change24h: _24change, change7d: _7dchange,
                    change30d : _30dchange, change1y: _1ychange};
        }
      }
      else{
      }


      return prices;
    }

    async getMetadata(){
      try{
        const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+this.policy_id+this.asset_name,
        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh'}});


        this.metadata = await data.json();
        if(this.metadata.metadata != null){
          return this.metadata.metadata;
        }
        else if(this.metadata.onchain_metadata != null){
          return this.metadata.onchain_metadata;
        }
        else{
          return null;
        }
      }catch(error){
        return null;
      }
        
    }

    getIpfsFromMetadata(){
      const keys = Object.keys(this.metadata);
      const values = Object.values(this.metadata);
      let ipfs = "";
      for(let i=0;i<keys.length;i++){


        if(keys[i] == "image"){
          ipfs = values[i];
        }
    
        if(keys[i] == "logo"){
          ipfs = "data:image/png;base64,"+values[i]
        }
      }
      try{
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
}



