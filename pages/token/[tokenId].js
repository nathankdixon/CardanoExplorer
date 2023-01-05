import { useRouter } from "next/router";
import Token from "../token";


function TokenPage({ipfs, meta, policyData}) {

    const router = useRouter();
    const { tokenId } = router.query;

    return (
      <div>
        <a href="/">Home</a>
        <h1 className="main-title">Token :  {tokenId}</h1>
        <div className="policyInfo">        <h3>Policy Info : <br /></h3>
        <p>Floor Price: {(policyData.floor_price)/1000000} ADA</p>
        <p>Total Volume: {(policyData.total_volume)/1000000} ADA</p>
        <p>Number of Holders: {(policyData.asset_holders)}</p></div>


        <h3>Metadata : <br /></h3>
        <p>{meta}</p>
        <div className="img-div"><img src={ipfs} className = "main-img"></img></div>
      </div>
    );
  }

async function loadTokenData(unit){
  const data = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/assets/'+unit,
  {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
  const res = await data.json();
  return res;
}

async function loadPolicyData(policy){
  const data = await fetch('https://api.opencnft.io/1/policy/'+policy,
  {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});
  const res = await data.json();
  return res;
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
    const tokenId = params.tokenId;

    const tokenData = await loadTokenData(tokenId);
    const policyData = await loadPolicyData(tokenData.policy_id);

    const token = new Token(tokenData.asset_name, tokenData.fingerprint, tokenData.policy_id, tokenData.quantity, tokenId);
    token.metadata = await token.getMetadata();

    const keys= Object.keys(token.metadata);
    const values = Object.values(token.metadata);

    const meta = JSON.stringify(token.metadata);

    const ipfs = token.getIpfsFromMetadata();

    return {
      props: {
        tokenId,
        ipfs,
        meta,
        policyData
      }
    }
  }
  
  export default TokenPage;