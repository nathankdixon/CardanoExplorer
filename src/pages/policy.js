import { useEffect, useState } from "react"

export default function Policy(props){

    const [display, setDisplay] = useState();

    useEffect(() => {
        async function func(){
            let policyData = await getCnftPolicyData(props.policy);
            if(policyData != null){
                console.log(policyData);
                let floorPrice = policyData.floor_price;
                let holders = policyData.asset_holders;
                let supply = policyData.asset_minted;
                let volume = policyData.total_volume;
                let thumbnail = policyData.thumbnail;

                let out = <div ><div>Floor Price  {floorPrice}</div><div>Holder {holders}</div>
                <div>Assets Minted {supply}</div><div>Total Volume {volume}</div><div>thumbnail {thumbnail}</div>
                </div>

                setDisplay(out);
            }
        }
        func();
    }, [props])

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


    return(<div className="policy-info">{display}</div>)
}