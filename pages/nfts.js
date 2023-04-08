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
        for (const nft of filteredNfts) {
          let policy = nft;
          if (!policy) continue;
          if (policy.ipfs == "") {
            singleGrid.push(<div key={policy.policy_id + "-noimg"} className="grid-item">
                <Image
                key={policy.policy_id + "-noimg"}
                width={200}
                height={200}
                className="grid-img"
                src={"/black.jpeg"}
              />
            </div>

            );
          } else {
            singleGrid.push(<Link href={"/" + policy.policy_id + policy.asset_name} key={policy.policy_id + policy.asset_name} className='grid-item'>
            <Image
            className="grid-img"
            src={policy.ipfs}
            height={200}
            width={200}
            alt={policy.asset_name}
          />
          <label className="item-name">{(policy.decoded_name).substring(0,20)}</label>

        </Link>);
          }
        }
      } else {
        setInfo("Collections: " + filteredNfts.length);
        

        for (const [index, element] of filteredNfts.entries()) {
          let policy = element;

          if (!policy) {
            singleGrid.push(<div key={"noimg-" + index} className="grid-item">
                <Image
                width={200}
                height={200}
                className="grid-img"
                src={"/black.jpeg"}
              />
            </div>);
          } else {
            if (policy[0].ipfs == "") {
              singleGrid.push(<div key={element.policy_id + "-noimg-" + index} className="grid-item">
                  <Image
                  width={200}
                  height={200}
                  className="grid-img"
                  src={"/black.jpeg"}
                />
              </div>

              );
            } else {
              if (policy.length > 1) {
                collectionGrid.push(<div key={policy[0].asset_name} className="grid-item-collection" onClick={() => showCollection(policy)}>
                  <Image                    
                    className="grid-img"
                    src={policy[0].ipfs}
                    height={200}
                    width={200}
                    alt={policy[0].asset_name}
                  />
                  <label className="item-name">{(policy[0].decoded_name).substring(0,20)}</label>
                </div>

                );
              } else {
                singleGrid.push(<Link href = {'/' + policy[0].policy_id + policy[0].asset_name} key={policy[0].asset_name} className="grid-item">
                  <Image
                    className="grid-img"
                    src={policy[0].ipfs}
                    height={200}
                    width={200}
                    alt={policy[0].asset_name}
                  />
                <label className="item-name">{(policy[0].decoded_name).substring(0,20)}</label>
                </Link>

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
          singleGrid.push(<Link href={'/'+policy[0].policy_id + policy[0].asset_name} className="grid-item" key={element.policy_id + "-noimg-"} >
            <Image
            width={200}
            height={200}
            className="grid-img"
            src={"/black.jpeg"}/>
          </Link> )
        }
        else{
          if(policy.length > 1){
            collectionGrid.push(<div className="grid-item-collection" onClick={() => showCollection(policy)} key = {policy[0].asset_name}>
              <Image className="grid-img" 
                src={policy[0].ipfs} height={200} width={200} alt = {policy[0].asset_name} 
                />
              <label className="item-name">{(policy[0].decoded_name)}</label>

            </div>  );
          }
          else{
            singleGrid.push(<Link className="grid-item" key = {policy[0].asset_name} href = {'/'+policy[0].policy_id + policy[0].asset_name}>
              <Image className="grid-img"  src={policy[0].ipfs} height={200} width={200} alt = {policy[0].asset_name} />
              <label className="item-name">{(policy[0].decoded_name).substring(0,20)}</label>
            </Link>);
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
          singleGrid.push(<Link href={"/" + element.policy_id + element.asset_name} className="grid-item" key={element.policy_id + "-noimg-" + index}>
            <Image
            width={200}
            height={200}
            className="grid-img"
            src={"/black.jpeg"}/>
           <label className="item-name">{(element.decoded_name).substring(0,20)}</label>

            </Link>
          );
        } else {
            singleGrid.push(<Link href={"/" + element.policy_id + element.asset_name} className="grid-item" key={element.asset_name}>
              <Image
              className="grid-img"
              src={element.ipfs}
              alt={element.asset_name}
              width={200}
              height={200}
              />
            <label className="item-name">{(element.decoded_name).substring(0,20)}</label>

            </Link>
              );
          }
      }
      setShowing("Back");
      setDisplay({ collections: collectionGrid, singles: singleGrid });
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
      {display.collections}
      </div>
      <h2>NFTs</h2>
      <div className="grid-nft">
        {display.singles}
      </div>
  </div>
);
}