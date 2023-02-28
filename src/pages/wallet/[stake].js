import { useRouter } from "next/router";
import SearchBar from "../searchbar";
import WalletButton from "../walletButton";
import WalletData from "../walletData";


function StakePage() {

    const router = useRouter();
    const { stake } = router.query;

    return (
      <div>
        <header>
        <label className="main-label">✥ Explorer</label>
        <SearchBar stake={stake}/>
        <WalletButton stake = {stake}/>
      </header>
        <div className="tokenList"><WalletData stakeAddress={stake}/></div>
      </div>
    );
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
    // In this case, we don't need to fetch anpny data because the number is already available in the params object.
    let stake = params.stake;
  
    
    return {
      props: {
        stake
      }
    }
  }
  
  export default StakePage;