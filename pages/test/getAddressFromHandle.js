            // no asset limit on how many assets gets returned on one request
  // koios, blockfrost is limited by 100 results per page
  export async function getAddressFromHandle(handle){
    let assetName = Buffer.from(handle).toString('hex');
    let policyID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';

    try{
      const req = await fetch('https://api.koios.rest/api/v0/asset_nft_address?_asset_policy='+policyID+'&_asset_name='+assetName);

      const res = await req.json();
      if(res[0].payment_address != null){
        return res[0].payment_address;
      }
      else{
        return null;
      }
    }catch(error){
      return null;
    }
  }