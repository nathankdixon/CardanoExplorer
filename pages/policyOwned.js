import { getDisplayName } from "next/dist/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react"


// takes list of tokens with ipfs and metadata and oupts a grid diplsaying said nfts
// used to display nfts owned by stake in policy
export default function PolicyOwned(props){

    const [display, setDisplay] = useState();
    const router = useRouter();


    useEffect(() => {
        if(props.nfts != null){
          let nftGrid = addNftsToGrid(props.nfts);
          setDisplay(nftGrid);
        }
    }, [props])

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

    function addNftsToGrid(nfts) {
        let grid = [];
      
        for (const element of nfts) {
         let policy = props.policy;
         let token = element;
         let assetName = token.asset_name;
         let assetId = policy+assetName;
         let ipfs = '/black.jpeg'

         let decryptName = Buffer.from(assetName, 'hex').toString();

         if(token.ipfs != null){
          ipfs = token.ipfs;
         }

          grid.push(
            <div key={token.asset_name + 'nft'} className="grid-item">
              <Image
                className="grid-img"
                src={ipfs}
                alt="failed to load image"
                width={270}
                height={270}
                onClick={() => router.push('/asset/' + token.policy_id + token.asset_name+'?stake='+props.stake)}
              />
                <div className="grid-item-text" style={{fontWeight: "bolder"}}>
                {decryptName}
              </div>
              <div className="grid-item-text">
                Asset Name: ..{assetName.slice(-7)}
                <button className="policy-button" onClick={(e) => copyText(e, assetId)}>
                  Copy
                </button>
                <Link className = 'policy-button' href={'https://www.jpg.store/asset/'+assetId}>JPG.store</Link>
              </div>
            </div>
          );
        }
      
        return grid;
      }

    return(<div className="grid-nft"><label>Your NFTs</label>{display}</div>)
}