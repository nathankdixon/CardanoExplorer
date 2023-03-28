import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WalletData from "./walletData";
import PolicyData from "./policyData";
import AssetData from "./assetData";


function Query(){

    const router = useRouter();

    const {query, stake} = router.query;
    const [display, setDisplay] = useState();

    useEffect(() => {
      async function checkIfPolicyOrAsset() {
    
        if (query) {

          let item = query;

          if(item.startsWith('stake')){
            setDisplay(<WalletData stake={query} />);
          }
          else if(item.startsWith('$')){
            let address = await getAddressFromHandle(query.slice(1));
            let stake = await getStakeFromAddress(address);
            setDisplay(<WalletData stake={stake} />);
          }
          else if(item.startsWith('addr')){
            let stake = await getStakeFromAddress(query);
            setDisplay(<WalletData stake={stake} />);
          }
          else if(item.length == 56){
            setDisplay(<PolicyData policy={query}/>);
          }
          else{
            setDisplay(<AssetData assetId={query} />);
          }
        }
      }
      checkIfPolicyOrAsset();
    }, [query, stake]);

            // no asset limit on how many assets gets returned on one request
  // koios, blockfrost is limited by 100 results per page
  async function getAddressFromHandle(handle){
    let assetName = Buffer.from(handle).toString('hex');
    let policyID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';

    try{
      const req = await fetch('https://api.koios.rest/api/v0/asset_nft_address?_asset_policy='+policyID+'&_asset_name='+assetName);

      const res = await req.json();
      console.log(res);
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

      // no asset limit on how many assets gets returned on one request
  // koios, blockfrost is limited by 100 results per page
  async function getStakeFromAddress(address){
    console.log(address);
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

    return(<div>{display}
          </div>)
}

export async function getStaticPaths() {
    // This function creates the dynamic paths for the page.
    // In this case, we have a list of all possible numbers between 1 and 5 that we can use to create the paths
    
    return {
      paths: [],
      fallback: true
    };
}

export async function getStaticProps({ params }) {
    // This function fetches the data for the page.
    // In this case, we don't need to fetch any data because the number is already available in the params object.
    const query= params.query;

    return {
      props: {
        query,
      }
    }
}

export default Query;