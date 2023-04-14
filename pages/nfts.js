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
    const [collectionText, setCollectionText] = useState("Collections");
    const [tokensText, setTokensText] = useState("Tokens");
    const [sortByFloorPrice, setSortByFloorPrice] = useState(false);
    const [sortByAssetName, setSortByAssetName] = useState(false);
    const [sortByQuantity, setSortByQuantity] = useState(false);
    const originalNfts = props.data.nfts;



    useEffect(() => {
      setGrid();
    }, [props.data, searchTerm, expanded, props.currency, sortByFloorPrice]);

    function setGrid() {
      let collectionGrid = [];
      let singleGrid = [];
      if (!props.data || !props.data.nfts || !props.currency) return;

      let filteredNfts = filterNFTs(props.data.nfts);
      if (expanded) {
        setCollectionText();
        setTokensText("Tokens: " + filteredNfts.length);
        for (const nft of filteredNfts) {
          let policy = nft;
          if (!policy) continue;
          if (policy.ipfs == "") {
            singleGrid.push(<div key={policy.policy_id + "-noimg"} className="grid-item">
                <Image
                key={policy.policy_id + "-noimg"}
                width={170}
                height={170}
                className="grid-img"
                src={"/black.jpeg"}/>
            </div>

            );
          } else {
            singleGrid.push(<Link href={"/" + policy.policy_id + policy.asset_name} key={policy.policy_id + policy.asset_name} className='grid-item'>
            <Image
            className="grid-img"
            src={policy.ipfs}
            height={170}
            width={170}
            alt={policy.asset_name}
          />
          <div className="item-text">
            <label className="item-name">{(policy.decoded_name).substring(0,20)}</label>
            <label className="item-name"><span className="currency">{props.currency.symbol}</span>{((policy.floor_price)*props.currency.value.price).toFixed(2)}</label>
          </div>

        </Link>);
          }
        }
      } else {
        let tokenCount = 0;
        let collectionCount = 0;

        for (const [index, element] of filteredNfts.entries()) {
          let policy = element;

          if (!policy) {
            singleGrid.push(<div key={"noimg-" + index} className="grid-item">
                <Image
                width={170}
                height={170}
                className="grid-img"
                src={"/black.jpeg"}
              />
            </div>);
          } else {
            if (policy[0].ipfs == "") {
              singleGrid.push(<div key={element.policy_id + "-noimg-" + index} className="grid-item">
                  <Image
                  width={170}
                  height={170}
                  className="grid-img"
                  src={"/black.jpeg"}
                />
              </div>

              );
            } else {
              if (policy.length > 1) {
                collectionCount += 1;
                collectionGrid.push(<div key={policy[0].asset_name} className="grid-item-collection" onClick={() => showCollection(policy)}>
                  <Image                    
                    className="grid-img"
                    src={policy[0].ipfs}
                    height={170}
                    width={170}
                    alt={policy[0].asset_name}
                  />
                  <div className="item-text">
                    <label className="item-name">{(policy[0].decoded_name).substring(0,20)}</label>
                    <label className="item-name"><span className="currency">{props.currency.symbol}</span>{((policy[0].floor_price)*props.currency.value.price).toFixed(2)}</label>
                    <label className="item-name">{policy.length} NFTs</label>
                  </div>
                </div>

                );
              } else {
                tokenCount += policy.length;
                singleGrid.push(<Link href = {'/' + policy[0].policy_id + policy[0].asset_name} key={policy[0].asset_name} className="grid-item">
                  <Image
                    className="grid-img"
                    src={policy[0].ipfs}
                    height={170}
                    width={170}
                    alt={policy[0].asset_name}
                  />
                <div className="item-text">
                  <label className="item-name">{(policy[0].decoded_name).substring(0,20)}</label>
                  <label className="item-name"><span className="currency">{props.currency.symbol}</span>{((policy[0].floor_price)*props.currency.value.price).toFixed(2)}</label>
                  </div>
                </Link>

                );
              }
            }
          }
        }
        setCollectionText("Collections: " + collectionCount);
        setTokensText("Tokens: " + tokenCount);
      }
      setDisplay({ collections: collectionGrid, singles: singleGrid });
    }
    
    function showWallet(){
      scrollToSection("nfts");
      setBackButton();
      let collectionGrid = [];
      let singleGrid = [];

      if(!expanded){
      setCollectionText("Collections: " + props.data.nfts.length);
      let tokenCount = 0;

      for(const element of props.data.nfts){
        let policy = element;
        if(policy[0].ipfs == "" || policy[0].ipfs == null){
          singleGrid.push(<Link href={'/'+policy[0].policy_id + policy[0].asset_name} className="grid-item" key={element.policy_id + "-noimg-"} >
            <Image
            width={170}
            height={170}
            className="grid-img"
            src={"/black.jpeg"}
            />
          </Link> )
        }
        else{
          if(policy.length > 1){
            collectionGrid.push(<div className="grid-item-collection" onClick={() => showCollection(policy)} key = {policy[0].asset_name}>
              <Image className="grid-img" 
                src={policy[0].ipfs} height={170} width={170} alt = {policy[0].asset_name} 
                />
                <div className="item-text">
                  <label className="item-name">{(policy[0].decoded_name)}</label>
                  <label className="item-name"><span className="currency">{props.currency.symbol}</span>{((policy[0].floor_price)*props.currency.value.price).toFixed(2)}</label>
                  <label className="item-name">{policy.length} NFTs</label>
                </div>
            </div>  );
          }
          else{
            tokenCount += policy.length;
            singleGrid.push(<Link className="grid-item" key = {policy[0].asset_name} href = {'/'+policy[0].policy_id + policy[0].asset_name}>
              <Image className="grid-img"  src={policy[0].ipfs} 
              height={170} width={170} alt = {policy[0].asset_name} />
              <div className="item-text">
                <label className="item-name">{(policy[0].decoded_name).substring(0,20)}</label>
                <label className="item-name"><span className="currency">{props.currency.symbol}</span>{((policy[0].floor_price)*props.currency.value.price).toFixed(2)}</label>
              </div>
            </Link>);
          }
        }
      }
      setTokensText("Tokens: " + tokenCount);
      setDisplay({ collections: collectionGrid, singles: singleGrid });
    }

    }

  
    function showCollection(policy) {
      scrollToSection("nfts");
      
      setCollectionText(<div>Policy: <Link href={'/'+policy[0].policy_id}>{policy[0].policy_id}</Link> with {policy.length} NFTs</div>);
      setBackButton(<button className="back-button" onClick={() => showWallet()}>Back</button>);

      let collectionGrid = [];
      let singleGrid = [];
      for (const [index, element] of policy.entries()) {
        if (element.ipfs == null) {
          singleGrid.push(<Link href={"/" + element.policy_id + element.asset_name} className="grid-item" key={element.policy_id + "-noimg-" + index}>
            <Image
            width={170}
            height={170}
            className="grid-img"
            src={"/black.jpeg"}
            />
            <div className="item-text">
              <label className="item-name">{(element.decoded_name).substring(0,20)}</label>
              <label className="item-name"><span className="currency">{props.currency.symbol}</span>{((policy[0].floor_price)*props.currency.value.price).toFixed(2)}</label>
            </div>

            </Link>
          );
        } else {
            singleGrid.push(<Link href={"/" + element.policy_id + element.asset_name} className="grid-item" key={element.asset_name}>
              <Image
              className="grid-img"
              src={element.ipfs}
              alt={element.asset_name}
              width={170}
              height={170}
              />
              <div className="item-text">
                <label className="item-name">{(element.decoded_name).substring(0,20)}</label>
                <label className="item-name"><span className="currency">{props.currency.symbol}</span>{((policy[0].floor_price)*props.currency.value.price).toFixed(2)}</label>
              </div>
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
      if (expanded) {
        filteredNfts = filteredNfts.flatMap((policy) => policy);
      }
    
      // Sort by floor_price if sortByFloorPrice is true
      if (!sortByFloorPrice) {

          if (expanded) {
            filteredNfts.sort((a, b) => b.floor_price - a.floor_price);
          } else {
            filteredNfts.sort((a, b) => b[0].floor_price - a[0].floor_price);
          }
        }
      if(sortByAssetName){
        if (expanded) {
          // Sort by asset_name
          filteredNfts.sort((a, b) => a.decoded_name.localeCompare(b.decoded_name));
        } else {
          // Sort by decoded_name
          filteredNfts.sort((a, b) =>
            a[0].decoded_name.localeCompare(b[0].decoded_name)
          );
        }
      }
      if(sortByQuantity){
        if(expanded){
          filteredNfts = filteredNfts.flatMap((policy) => policy);
        }
        else{
          filteredNfts = originalNfts;
        }
        
      }
          

    
      return filteredNfts;
    }
    

    function handleSort(option){
      if(option == "floor_price"){
        setSortByFloorPrice(true);
        setSortByQuantity(false);
        setSortByAssetName(false);
      }
      else if(option == "asset_name"){
        setSortByFloorPrice(false);
        setSortByAssetName(true);
        setSortByQuantity(false);
      }
      else{
        setSortByFloorPrice(false);
        setSortByAssetName(false);
        setSortByQuantity(true);
      }
    }
    


return (
  <div className="nfts">
    <div style={{fontSize: '30px',fontWeight: 'bold'}}>NFTs</div>
    <nav className="nft-nav">{backButton}
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
          checked={sortByFloorPrice}
          onChange={() => handleSort("floor_price")}
        />
        Sort by floor price
      </label>
      <label>
        <input
          type="checkbox"
          checked={sortByAssetName}
          onChange={() => handleSort("asset_name")}
        />
        Sort by assetName
      </label>
      <label>
        <input
          type="checkbox"
          checked={sortByQuantity}
          onChange={() => handleSort("quantity")}
        />
        Sort by Quantity
      </label>
      </nav>
        <div style={{fontSize: '25px'}}>{collectionText}</div>
      <div className="grid-nft">
      {display.collections}
      </div>
      <div style={{fontSize: '25px'}}>{tokensText}</div>
      <div className="grid-nft">
        {display.singles}
      </div>
  </div>
);
}