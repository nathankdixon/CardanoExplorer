import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// returns a flex box of nft showing image, name and quantity
export default function Nfts (props){

    const [display, setDisplay] = useState("NFTs");
    const [showing, setShowing] = useState("Wallet");
    const [backButton, setBackButton] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [sortByAssetName, setSortByAssetName] = useState(false);

    const [info, setInfo] = useState();
    const router = useRouter();

    useEffect(() => {
      setGrid();
    }, [props.data, searchTerm, expanded, sortByAssetName]);

    function setGrid() {
      let collectionGrid = [];
      let singleGrid = [];
      if (!props.data || !props.data.nfts) return;
      let filteredNfts = filterNFTs(props.data.nfts);
      if (expanded) {
        setInfo("NFTs: " + filteredNfts.length);
        setBackButton(<button className="back-button" onClick={() => showWallet()}>Back</button>);

        for (const nft of filteredNfts) {
          let policy = nft;
          if (!policy) continue;
          if (policy.ipfs == "") {
            singleGrid.push(
              <Image
                key={policy.policy_id + "-noimg"}
                width={200}
                height={200}
                className="grid-item"
                src={"/black.jpeg"}
              />
            );
          } else {
            if (policy.length > 1) {
              collectionGrid.push(
                <Image
                  className="grid-item-collection"
                  key={policy.asset_name}
                  src={policy.ipfs}
                  height={200}
                  width={200}
                  alt={policy.asset_name}
                  onClick={() => showCollection(policy)}
                />
              );
            } else {
              singleGrid.push(
                <Image
                  className="grid-item"
                  key={policy.asset_name}
                  src={policy.ipfs}
                  height={200}
                  width={200}
                  alt={policy.asset_name}
                  onClick={() =>
                    router.push(
                      "/" + policy.policy_id + policy.asset_name
                    )
                  }
                />
              );
            }
          }
        }
      } else {
        setInfo("Collections: " + filteredNfts.length);

        for (const [index, element] of filteredNfts.entries()) {
          let policy = element;
          if (!policy) {
            singleGrid.push(
              <Image
                key={"noimg-" + index}
                width={200}
                height={200}
                className="grid-item"
                src={"/black.jpeg"}
              />
            );
          } else {
            if (policy[0].ipfs == "") {
              singleGrid.push(
                <Image
                  key={element.policy_id + "-noimg-" + index}
                  width={200}
                  height={200}
                  className="grid-item"
                  src={"/black.jpeg"}
                />
              );
            } else {
              if (policy.length > 1) {
                collectionGrid.push(
                  <Image
                    className="grid-item-collection"
                    key={policy[0].asset_name}
                    src={policy[0].ipfs}
                    height={200}
                    width={200}
                    alt={policy[0].asset_name}
                    onClick={() => showCollection(policy)}
                  />
                );
              } else {
                singleGrid.push(
                  <Image
                    className="grid-item"
                    key={policy[0].asset_name}
                    src={policy[0].ipfs}
                    height={200}
                    width={200}
                    alt={policy[0].asset_name}
                    onClick={() =>
                      router.push(
                        "/" + policy[0].policy_id + policy[0].asset_name
                      )
                    }
                  />
                );
              }
            }
          }
        }
      }
      setDisplay({ collections: collectionGrid, singles: singleGrid });
    }
    
    function showWallet(){
      scrollToSection("nfts");
      setBackButton();
      let collectionGrid = [];
      let singleGrid = [];

      if(!expanded){
      setInfo("Collections: " + props.data.nfts.length);

      for(const element of props.data.nfts){
        let policy = element;
        if(policy[0].ipfs == "" || policy[0].ipfs == null){
          singleGrid.push(          <Image
            key={element.policy_id + "-noimg-"}
            width={200}
            height={200}
            className="grid-item"
            src={"/black.jpeg"}/>)
        }
        else{
          if(policy.length > 1){
            collectionGrid.push(<Image className="grid-item-collection"  key = {policy[0].asset_name} src={policy[0].ipfs} height={200} width={200} alt = {policy[0].asset_name} onClick={() => showCollection(policy)}/>);
          }
          else{
            singleGrid.push(<Image className="grid-item"  key = {policy[0].asset_name} src={policy[0].ipfs} height={200} width={200} alt = {policy[0].asset_name} onClick={() => showCollection(policy)}/>);
          }
        }
      }
      setDisplay({ collections: collectionGrid, singles: singleGrid });
    }

    }

  
    function showCollection(policy) {
      scrollToSection("nfts");
      setInfo("Showing Policy: " +policy[0].policy_id +" with " +policy.length +" NFTs");
      setBackButton(<button className="back-button" onClick={() => showWallet()}>Back</button>);

      let collectionGrid = [];
      let singleGrid = [];
      for (const [index, element] of policy.entries()) {
        if (element.ipfs == null) {
          singleGrid.push(
          <Image
            key={element.policy_id + "-noimg-" + index}
            width={200}
            height={200}
            className="grid-item"
            src={"/black.jpeg"}/>
          );
        } else {
            singleGrid.push(
              <Image
              className="grid-item"
              key={element.asset_name}
              src={element.ipfs}
              alt={element.asset_name}
              width={200}
              height={200}
              onClick={() =>
              router.push("/" + element.policy_id + element.asset_name)
              }/>);
          }
      }
      setShowing("Back");
      setDisplay({ collections: collectionGrid, singles: singleGrid });
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
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: "smooth" });
    };

    function filterNFTs(nfts) {
      let filteredNfts = nfts;
      if (searchTerm) {
        filteredNfts = filteredNfts.filter((policy) =>
          policy.some((nft) =>
            nft.decoded_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    
      if (sortByAssetName) {
        filteredNfts = filteredNfts.map((policy) =>
          policy.slice().sort((a, b) => a.decoded_name.localeCompare(b.decoded_name))
        );
      }
    
      if (expanded) {
        filteredNfts = filteredNfts.flatMap((policy) => policy);
      }
    
      return filteredNfts;
    }


return (
  <div className="nfts">
    <h1>NFTs</h1>
    <nav className="nft-nav">{backButton}{info}
      <input
        type="search"
        placeholder="Search by asset name"
        value={searchTerm}
        className='search-nft'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label>
        <input
        type="checkbox"
        checked={expanded}
        onChange={() => setExpanded(!expanded)}
      />
        Expand all collections
      </label>
      <label>
      <input
        type="checkbox"
        checked={sortByAssetName}
        onChange={() => setSortByAssetName(!sortByAssetName)}
      />
        Sort by asset name
      </label>
      </nav>
        <h2>NFT Collections</h2>
      <div className="grid-nft">
        <div className="collection-grid">{display.collections}</div>
      </div>
      <h2>NFTs</h2>
      <div className="grid-nft">
        <div className="single-grid">{display.singles}</div>
      </div>
  </div>
);
}