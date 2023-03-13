import Image from "next/image";
import { useEffect, useState } from "react"
import Token from "./token.js";

export default function Transactions(props){

    const [display, setDisplay] = useState("Transactions");
    useEffect(() => {
        async function getTxs(){
            if(props.data.stake != null){
                let display = []
                display.push(<tr key={'tx'} className="grid-item-tx" style={{fontWeight: "bolder"}}>
                    <td>Token</td><td>Transaction Hash</td><td>Transaction Index</td><td>Block Height</td><td>Block Time</td></tr>)
                let nfts = props.data.nfts;

                const req = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/accounts/'+props.data.stake+'/addresses/total',
                {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
                let res = await req.json();

                let assets = res.received_sum;

                if(assets != null){
                for(let i=0; i<assets.length; i++){
                    let policy = (assets[i].unit).substring(0,56);
                    let assetName = (assets[i].unit).substring(56);
                    let unit = assets[i].unit;

                    if(unit != 'lovelace'){

 
                        let token = new Token(assetName, policy, assets[i].quantity);
                        let metadata = await token.getMetadata();
    
                        if(metadata != null){
                            let ipfs = token.getIpfsFromMetadata();
                            token.ipfs = ipfs;
                        }


                        const req = await fetch("https://cardano-mainnet.blockfrost.io/api/v0/assets/"+unit+"/transactions",
                        {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
                        let res = await req.json();

                        
                        let lasttx = res[0];
                        display.push(<tr key={unit + 'tx'} className="grid-item-tx"><td>
                            <Image src={token.ipfs} width={100} height = {100} alt= {token.asset_name}/></td>
                            <td>{lasttx.tx_hash}</td><td>{lasttx.tx_index}</td>
                            <td>{lasttx.block_height}</td><td>{lasttx.block_time}</td>
                            </tr>)
                    }
                }
            }
            setDisplay(<table><tbody>{display}</tbody></table>);
            }
        }
        getTxs();

    }, [props.data])
    return (
        <div className="grid-tx">{display}
        </div>
    )
}