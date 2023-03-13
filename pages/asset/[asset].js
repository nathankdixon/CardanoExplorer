import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PolicyData from "../policyData";
import SearchBar from "../searchbar";
import TokenData from "../tokenData";
import WalletButton from "../walletButton";

function Asset(){

    const router = useRouter();

    const {asset, stake} = router.query;
    const [display, setDisplay] = useState();
    const [walletText, setWalletText] = useState('Connect')

    useEffect(() => {
      async function checkIfPolicyOrAsset(){
        if(asset != null && stake != null){
          setWalletText(stake.substring(0,7));
          if(asset.length == 56){
            setDisplay(<PolicyData policy={asset} stake = {stake}/>);
          }
          else if(asset.length < 56){
            setDisplay('invalid policy Id or assetID');
          }
          else{
            // is asset + policy = assetId
            setDisplay(<TokenData assetId = {asset} stake= {stake}/>);
          }
        }
      }
      checkIfPolicyOrAsset();
    }, [asset, stake])

    return(<div>      
      <header>
      <label className="main-label">✥ Explorer</label>
      <SearchBar stake = {stake}/>
      <WalletButton stake = {stake}/>
    </header>{display}
    </div>)
}

export async function getStaticPaths() {
    // This function creates the dynamic paths for the page.
    // In this case, we have a list of all possible numbers between 1 and 5 that we can use to create the paths
    
    return {
      paths: [],
      fallback: true
    };
}

export async function getStaticProps({ params }) {
    // This function fetches the data for the page.
    // In this case, we don't need to fetch any data because the number is already available in the params object.
    const asset= params.asset;

    return {
      props: {
        asset,
      }
    }
}

export default Asset;