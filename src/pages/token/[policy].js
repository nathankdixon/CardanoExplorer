import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PolicyData from "../policyData";
import SearchBar from "../searchbar";
import TokenData from "../tokenData";
import WalletButton from "../walletButton";

function Policy(){

    const router = useRouter();

    const {policy, stake} = router.query;
    const [display, setDisplay] = useState();
    const [walletText, setWalletText] = useState('Connect')

    useEffect(() => {
      async function func(){
        if(policy != null && stake != null){
          setWalletText(stake.substring(0,7));
          if(policy.length == 56){
            setDisplay(<PolicyData policy={policy} stake = {stake}/>);
          }
          else if(policy.length < 56){
            setDisplay('invalid policy Id or assetID');
          }
          else{
            // is asset + policy = assetId
            setDisplay(<TokenData assetId = {policy} stake= {stake}/>);
          }
        }
      }
      func();
    }, [policy, stake])

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
    const policy= params.policy;

    return {
      props: {
        policy
      }
    }
}

export default Policy;