// if metadata has been fetched
    // find the ipfs link under 'image' metadata tag and store it
const getIpfsFromMetadata = (metadata) =>{
      const keys = Object.keys(metadata);
      const values = Object.values(metadata);
      let ipfs = "";
      for(let i=0;i<keys.length;i++){


        if(keys[i] == "image"){
          ipfs = values[i];
        }
        
        // fungible tokens will have a 'logo' instead of 'image' tag
        else if(keys[i] == "logo"){
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
        return '/black.jpeg';
      }
      return ipfs;
    
    }



export default class Token {
  constructor(asset_name, policy_id, quantity) {
    this.asset_name = asset_name;
    this.policy_id = policy_id;
    this.quantity = quantity;
    this.onchain_metadata = null;
    this.metadata = null;
    this.txs = null;
    this.ipfs = '/black.jpeg';
    this.prices = null;
    this.image = null;
    this.decoded_name =  Buffer.from(asset_name, 'hex').toString();
  }

  async fetchTokenMetadata() {
    try {
      let req = await fetch('https://api.koios.rest/api/v0/asset_info?_asset_policy=' + this.policy_id + '&_asset_name=' + this.asset_name);
      let res = await req.json();
      let decod = Buffer.from(this.asset_name, 'hex').toString();
      try {
        if (res[0].minting_tx_metadata && res[0].minting_tx_metadata[721]) {
          if (res[0].minting_tx_metadata[721][this.policy_id][decod]) {
            this.onchain_metadata = res[0].minting_tx_metadata[721][this.policy_id][decod];
            this.ipfs = getIpfsFromMetadata(res[0].minting_tx_metadata[721][this.policy_id][decod]);
  
            if (this.ipfs == '/black.jpeg') {
              this.ipfs = getIpfsFromMetadata(res[0].token_registry_metadata);
            }
          } else {
            this.onchain_metadata = res[0].minting_tx_metadata;
          }
        }
        if (res[0].token_registry_metadata) {
          this.metadata = res[0].token_registry_metadata;
          let ipfs = getIpfsFromMetadata(res[0].token_registry_metadata);
          if(ipfs != ''){
            this.ipfs = ipfs;
          }
          else{
          }
        } else if (!res[0].minting_tx_metadata && !res[0].minting_tx_metadata) {
          console.log("no metadata found");
        }
      } catch (error) {
        console.error(error, res);
      }
    } catch (error) {
      console.error("Error in fetchTokenMetadata:", error);
    }
  }
  


  async getPrice() {
    if (this.quantity === 1) {
      return;
    }try {
      const request = await fetch('/coin-gecko.json');
      const geckoData = await request.json();
      const ticker = this.metadata?.ticker;
    
      if (!ticker) {
        return;
      }
    
      const foundGeckoCoin = geckoData.find(item => item.symbol === ticker.toLowerCase());
      if (!foundGeckoCoin) {
        return;
      }

      console.log(foundGeckoCoin.id);
    
      const req = await fetch(`https://api.coingecko.com/api/v3/coins/${foundGeckoCoin.id}`);
      const res = await req.json();
    
      if (res.asset_platform_id === 'cardano') {
        const priceData = res.market_data;
        this.prices = {
          current: priceData.current_price.usd.toFixed(2),
          change24h: priceData.price_change_percentage_24h.toFixed(2),
          change7d: priceData.price_change_percentage_7d.toFixed(2),
          change30d: priceData.price_change_percentage_30d.toFixed(2),
          change1y: priceData.price_change_percentage_1y.toFixed(2),
        };
      }
    } catch (error) {
      console.error('Error fetching price data:', error);
    }
  }
}    
