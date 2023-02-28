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

        // returns base address from handle
        const getAddressFromHandle = async (handle) => {
          try{
            let policyID = 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a';
          
            // A blank Handle name should always be ignored.
            if (handle.length === 0) {
              // Handle error.
            }
          
            // Convert handleName to hex encoding.
            let assetName = Buffer.from(handle).toString('hex');
          
            const data = await fetch(
              `https://cardano-mainnet.blockfrost.io/api/v0/assets/${policyID}${assetName}/addresses`,
              {
                headers: {
                  // Your Blockfrost API key
                  project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh',
                  'Content-Type': 'application/json'
                }
              }
            ).then(res => res.json());
            
            let stake = await getStakeFromAddressKoios(data[0].address);
            return stake;
          }catch(error){
            return null;
          }
      
        }
    
          // used when fetching handle address
      async function getStakeFromAddressKoios(address){
        try{
          const req = await fetch('https://api.koios.rest/api/v0/address_info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "_addresses": [ address
              ]
            })
          });
      
          const res = await req.json();
          return res[0].stake_address;
        }catch(error){
          return null;
        }
    
      }

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