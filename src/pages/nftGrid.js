import { getDisplayName } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react"


// takes list of tokens with ipfs and metadata and oupts a grid diplsaying said nfts
export default function NftGrid(props){

    const [display, setDisplay] = useState();
    const router = useRouter();


    useEffect(() => {
        function func (){
            if(props.nfts != null){
                let nftGrid = addNftsToGrid(props.nfts);
                setDisplay(nftGrid);
            }

        }
        func();
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
         let token = element;
         let assetName = token.asset_name;
         let ipfs = '/black.jpeg'

         let decryptName = Buffer.from(assetName, 'hex').toString();


         ipfs = token.ipfs;

          grid.push(
            <div key={token.asset_name + 'nft'} className="grid-item">
              <Image
                className="grid-img"
                src={ipfs}
                alt="failed to load image"
                width={270}
                height={270}
                onClick={() => router.push('/token/' + token.policy_id + token.asset_name+'?stake='+props.stake)}
              />
                <div className="grid-item-text">
                {decryptName}
              </div>
              <div className="grid-item-text">
                Asset Name: {assetName.substring(0, 7)}...
                <button
                  className="policy-button"
                  onClick={(e) => copyText(e, assetName)}
                >
                  Copy
                </button>
              </div>
            </div>
          );
        }
      
        return grid;
      }

    return(<div className="grid-nft"><label>Your NFTs</label>{display}</div>)
}