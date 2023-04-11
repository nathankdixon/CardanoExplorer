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
          return "data:image/png;base64,"+values[i];
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

          if(newipfs.startsWith('ipfs://')){
            newipfs = newipfs.slice(7);
            if(newipfs.startsWith('ipfs/')){
              newipfs = newipfs.slice(5);
            }
            newipfs = "http://dweb.link/ipfs/"+newipfs;
          }

          else if(newipfs.startsWith('ipfs/')){
            newipfs = newipfs.slice(5);
            newipfs = "http://dweb.link/ipfs/"+newipfs;
          }

          else if(newipfs.startsWith('Qm')){
            newipfs = "http://dweb.link/ipfs/"+newipfs;
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

      if(ipfs.startsWith('ba')){
        ipfs = "http://dweb.link/ipfs/"+ipfs;
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
    this.ipfs = '/black.jpeg';
    this.prices = null;
    this.decoded_name =  Buffer.from(asset_name, 'hex').toString();
    this.floor_price = null;
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
        } else if (!res[0].minting_tx_metadata ) {
          console.log("no metadata found");
        }
      } catch (error) {
        console.error(error, res);
      }
    } catch (error) {
      console.error("Error in fetchTokenMetadata:", error);
    }
  }
  


  async fetchTokenPrice() {
    if (this.quantity == 1) {
      try{
        let request = await fetch('https://api.opencnft.io/2/collection/'+this.policy_id+'/floor_price',
        {headers: {"X-Api-Key": "ocnft_64230513320ac06596270a21"}});

        if(request.status == 429){

          //wait 5 seconds and try again
          await new Promise(r => setTimeout(r, 200));
          request = await fetch('https://api.opencnft.io/2/collection/'+this.policy_id+'/floor_price',
          {headers: {"X-Api-Key": "ocnft_64230513320ac06596270a21"}});
        }
        else if(request.status == 200){
          let opencnftData = await request.json();
          if(opencnftData.floor_price){
            this.floor_price = (opencnftData.floor_price/1000000);
            console.log("floor price: ", this.floor_price);
          }
        }
        else{
          this.floor_price = 0;
        }
      }
      catch(error){
        this.floor_price = 0;
        throw new Error('Error in OpenCNFT');
      }
    }
    else{
      try {
        let request = await fetch('/coin-gecko-id-cardano.json');
        let geckoData = await request.json();
        let ticker = (this.metadata?.ticker);
      
        if (!ticker) {
          return;
        }
      
        let foundGeckoCoin = geckoData.find(item => item.symbol === ticker.toLowerCase());
        if (!foundGeckoCoin) {
          return;
        }
      
        let req = await fetch(`https://api.coingecko.com/api/v3/coins/${foundGeckoCoin.id}`);
        let res = await req.json();
        let priceData = res.market_data;
        this.prices = {
          current: priceData.current_price.usd.toFixed(2),
          change24h: priceData.price_change_percentage_24h.toFixed(2),
          change7d: priceData.price_change_percentage_7d.toFixed(2),
          change30d: priceData.price_change_percentage_30d.toFixed(2),
          change1y: priceData.price_change_percentage_1y.toFixed(2),
        };
      } catch (error) {
        throw new Error('coin gecko error');
      }
    }
    

  }
}    
