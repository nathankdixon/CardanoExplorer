import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Policy(props){

    const [display, setDisplay] = useState({policy: '', thumbnail: '/black.jpeg', floorPrice:'', holders: '', supply :'', volume:''});
    const [currency, setCurrency] = useState({value: 1, symbol: '$'});

    useEffect(() => {
        async function func(){
          if(props.policy != null && props.prices != null){
            let policyData = await getCnftPolicyData(props.policy);
            if(policyData != null){

              let currency = props.prices.currency;
              setCurrency(currency);


                let floorPrice = ((policyData.floor_price/1000000)*currency.value).toFixed(2);
                let holders = policyData.asset_holders;
                let supply = policyData.asset_minted;
                let volume = ((policyData.total_volume/1000000000000)*currency.value).toFixed(2);
                let thumbnail = getIpfs(policyData.thumbnail);

                let obj = {policy: props.policy, thumbnail : thumbnail, floorPrice: floorPrice, holders: holders, supply: supply, volume: volume}

                setDisplay(obj);
            }
          } 

        }
        func();
    }, [props])

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

    async function getCnftPolicyData(policy){
        try{
          const data = await fetch('https://api.opencnft.io/1/policy/'+policy,
          {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
          const res = await data.json();
  
          if(data.status!= 200){
            return null;
          }
          return res;
        }catch(error){
          return null;
        }
      }

      function copyText(event, text) {
        navigator.clipboard.writeText(text).then(() => {
          // Update the button text to "Copied!"
          const button = event.target;
          event.target.innerText = "Copied";
          setTimeout(() => {
            // Reset the button text after 1 second
            button.textContent = "Copy";
          }, 1000);
        });
      }


    return(<div className="policy-info">
            <div className="policy-section">
              <div className="policy-item-info">Policy: 
                  <Link className = 'policy-button' href={'/asset/'+display.policy+'?stake='+props.stake}><div className="policy-value">{(display.policy)}</div></Link>
                  <button
                    className="policy-button"
                    onClick={(e) => copyText(e, display.policy)}
                  >
                    Copy
                  </button>
                </div>
            </div>
            <div className="policy-section-item">
              <div className="policy-item-info">
                <Image src = {display.thumbnail} width={100} height={100} alt='no img' className="policy-thumbnail"/>
              </div>
              <div className="policy-item-info">
              Supply:<div className='value'>{display.supply}</div>
              </div>
              <div className="policy-item-info">
              Volume: <div className="value"><div className="currency">{currency.symbol}</div>{display.volume}m</div>
              </div>
              <div className="policy-item-info">
              Floor Price: <div className="value"><div className="currency">{currency.symbol}</div>{display.floorPrice}</div>
              </div>
            </div>
            </div>
              )
}