import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// returns a flex box of nft showing image, name and quantity
export default function Nfts (props){

    const [display, setDisplay] = useState([]);
    const router = useRouter();

    useEffect(() => {
      if(props.tokens != null){
        showTokens(props.tokens.nfts);

      }
    }, [props]);

    const showTokens = (nfts) => {
      // array of table items to be added to display
      let _display = [];
      if(nfts == null){

        // no nfts present in wallet
        _display.push(<div className="grid-item">No NFTs :/</div>);
      }
      else{
        // show no nft text
        if(nfts.length == 0){
          _display.push(<div style={{fontWeight: 'bold'}}>No NFTs :/</div>);
        }
        else{

          // adds the first item in policy to the table
          let policies = Object.keys(nfts);
          let nftsGrid = addNftsToGrid(nfts, policies);

          _display.push(nftsGrid);
        }


      }
      setDisplay(_display);
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
    
    function addNftsToGrid(nfts, policies) {
      let grid = [];
    
      for (const policy of policies) {
        let token = nfts[policy][0];
    
        let policyId = '';
    
        policyId = (token.policy_id);
    
        let path = 'token';
    
        if (nfts[policy].length > 1) {
          grid.push(
            <div
              key={token.asset_name + 'nft'}
              className="grid-item-collection"
            >
              <Image
                className="grid-img"
                src={token.ipfs}
                alt="failed to load image"
                width={270}
                height={270}
                onClick={() => showTokensFromPolicy(nfts[policy])}
              />
              <div className="grid-item-text">
                Policy: {policyId.substring(0, 7)}...
                <button
                  className="policy-button"
                  onClick={(e) => copyText(e, policyId)}
                >
                  Copy
                </button>
              </div>
              <div className="grid-item-text">Quantity: {nfts[policy].length}</div>
            </div>
          );
        } else {
          grid.push(
            <div key={token.asset_name + 'nft'} className="grid-item">
              <Image
                className="grid-img"
                src={token.ipfs}
                alt="failed to load image"
                width={270}
                height={270}
                onClick={() => router.push('/'+path+'/'+token.policy_id+token.asset_name+'?stake='+props.tokens.stake)}
              />
                <div className="grid-item-text">
                Policy: {policyId.substring(0, 7)}...
                <button
                  className="policy-button"
                  onClick={(e) => copyText(e, policyId)}
                >
                  Copy
                </button>
              </div>
              <div className="grid-item-text">Quantity: {nfts[policy].length}</div>

            </div>
          );
        }
      }
    
      return grid;
    }
    

    // upon clicking a collection image, the nfts from that collection replaces the grid
    function showTokensFromPolicy(policy){
        let _display = [];
        
        for(const token of policy){

          let policyId = '';
    
          policyId = (token.policy_id);

          let path = 'token';

          _display.push(
          <div key = {token.asset_name + 'poly'} className = "grid-item" onClick={() => router.push('/'+path+'/'+token.policy_id+token.asset_name+'?stake='+props.tokens.stake)}>
            <Image className="grid-img" src= {token.ipfs}
          alt = 'failed to load image' width={270} height={270}/>
            <div className="grid-item-info">
            <div className="grid-item-text">
                  Policy: {policyId.substring(0, 7)}...
                  <button
                    className="policy-button"
                    onClick={(e) => copyText(e, policyId)}
                  >
                    Copy
                  </button>
                </div>
          </div>
          </div>);
        }
        setDisplay(_display);
    }

    //returns a grid view of all NFTs grouped by policy
    return (
      <div>
        <nav><button className="setting-button" onClick={() => showTokens(props.tokens.nfts)}>Show All</button></nav>
        <div className="grid-nft">{display}</div>
      </div>

    )
}