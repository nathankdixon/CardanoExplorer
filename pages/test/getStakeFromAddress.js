      // no asset limit on how many assets gets returned on one request
  // koios, blockfrost is limited by 100 results per page
  export async function getStakeFromAddress(address){
    try{
      const req = await fetch('https://api.koios.rest/api/v0/address_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_addresses": [
            address
          ]
        })
      });

      const res = await req.json();
      if(res[0].stake_address != null){
        return res[0].stake_address;
      }
      else{
        return null;
      }
    }catch(error){
      return null;
    }
  }