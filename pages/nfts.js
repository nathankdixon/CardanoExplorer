import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CollectionCard from "./collectionCard";

// returns a flex box of nft showing image, name and quantity
export default function Nfts (props){

    const [display, setDisplay] = useState("NFTs");
    const [showing, setShowing] = useState("Wallet");
    const [backButton, setBackButton] = useState();
    const [info, setInfo] = useState();
    const router = useRouter();

    useEffect(() => {
      function setGrid(){
        let grid = [];
        setInfo("Collections: " + props.data.nfts.length);
        for(const element of props.data.nfts){
          let policy = element;
          if(policy[0].ipfs == "" || policy[0].ipfs == null){
            grid.push(<div key = {policy[0].asset_name+'noimg'} className="grid-item">no image</div>)
          }
          else{
            grid.push(<Image className="grid-item" key = {policy[0].asset_name} src={policy[0].ipfs} height={200} width={200} alt = {policy[0].asset_name} onClick={() => showCollection(policy)}/>);
          }
        }
        setDisplay(grid);
      }
      setGrid();
    }, [props.data])

    function showWallet(){
      scrollToSection("nfts");
      setBackButton();
      let grid = [];
      setInfo("Collections: " + props.data.nfts.length);

      for(const element of props.data.nfts){
        let policy = element;
        if(policy[0].ipfs == "" || policy[0].ipfs == null){
          grid.push(<div className="grid-item">no image</div>)
        }
        else{
          grid.push(<Image className="grid-item"  key = {policy[0].asset_name} src={policy[0].ipfs} height={200} width={200} alt = {policy[0].asset_name} onClick={() => showCollection(policy)}/>);
        }
      }
      setDisplay(grid);

    }

    function showCollection(policy){
      scrollToSection("nfts");
      setInfo("Showing Policy: " + policy[0].policy_id + " with " + policy.length + " NFTs" );
      setBackButton(<button className="back-button" onClick={() => showWallet()}>Back</button>);
      let grid = [];
      for(const element of policy){
        if(element.ipfs == null){
          grid.push(<div className="grid-item">no image</div>)
        }
        else{
          grid.push(<Image className="grid-item" key = {element.asset_name} src={element.ipfs} alt={element.asset_name} width={200} height={200} onClick={() => router.push('/'+element.policy_id+element.asset_name)}/>);

        }
      }
      setShowing("Back");
      setDisplay(grid);
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

    //returns a grid view of all NFTs grouped by policy
    return (
      <div className="nfts">
        <h1>Non-Fungible Tokens</h1>
        <nav className="nft-nav">{backButton}{info}</nav>
        <div className="grid-nft">
          {display}
        </div>
      </div>


    )
}