import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import WalletData from "./walletData";
import SearchBar from "./searchbar";
import WalletButton from "./walletButton";
import PolicyData from "./policyData";
import AssetData from "./assetData";


function Query(){

    const router = useRouter();

    const {query, stake} = router.query;
    const [display, setDisplay] = useState();
    const [walletText, setWalletText] = useState('Connect')

    useEffect(() => {
      function checkIfPolicyOrAsset() {
    
        if (query) {

          let item = query;

          if(item.startsWith('stake') || item.startsWith('$')){
            setDisplay(<WalletData stake={query} />);
          }
          else if(item.length == 56){
            setDisplay(<PolicyData policy={query}/>);
          }
          else{
            setDisplay(<AssetData assetId={query} />);
          }
        }
      }
      checkIfPolicyOrAsset();
    }, [query, stake]);
    

    return(<div>{display}
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
    const query= params.query;

    return {
      props: {
        query,
      }
    }
}

export default Query;