import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Fts from "./fts";
import Nfts from "./nfts";
import Summary from "./summary";
import Token from "./token";
import Transaction from "./transactions";
import WalletButton from "./walletButton";


function WalletData (props) {
  const [isLoading, setisLoading] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState();
  const [walletData, setWalletData] = useState({stake: null, tokenNumber: 0, projectNumber: 0, nfts: [], fts: []});

  const router = useRouter();

  useEffect(() => {
    const getTokens = async () =>{

      if(props.stake != undefined){
          //loading icon
          setisLoading('fetching');
          setIsVisible(true);
  
          // props passed from [stake].js
          let stakeAddress = props.stake;

          if(stakeAddress[0] == ('$')){
            let stake = await getAddressFromHandle(stakeAddress.slice(1));
            stakeAddress = stake;
          }
          else if(stakeAddress[0] == ('s')){
            // do nothing
          }
          else{
            console.log('invalid stake address');
            stakeAddress = null;
          }

          if(stakeAddress != null){
            // used to store and retrieve wallet information in local storage
            let walletData = '';
            walletData = await createWalletDataFromStake(stakeAddress);
            console.log(walletData);
    
            // //if stake data exist in storage -- get it
            // if(localStorage.getItem(stakeAddress)){
            //   walletData = JSON.parse(localStorage.getItem(stakeAddress));
            // }
    
            // //if no stored data, create new and store it with stake address as key
            // else{
    
            //   if(walletData != null){
            //     localStorage.setItem(stakeAddress, JSON.stringify(walletData));
            //   }
            // }
    
            setWalletData(walletData);
            // loading icon
            setisLoading('done');
            setIsVisible(false);
          }
          else{
            setisLoading('error');
          }
      }
    }
    getTokens();
  }, [props.stake]);


  // creates savable wallet data object
  // which gets stored in local storage
  async function createWalletDataFromStake(stake){

    let walletData = '';
    // json list of assets in stake address
    let assets = await getAssetsFromKoios(stake);
    // no assets
    if(assets == null || assets.length == 0){
      walletData = {stake : stake, tokenNumber: 0, projectNumber:0, nfts: [], fts : []};
    }
    else{
      //assets, create new stake data
      try{
        // list of 'token' objects with assgined attributes
        let _tokens = await createTokens(assets);

        // total number of tokens - used in summary
        let _tokenNumber = _tokens.length;

        // create list of policy Ids - with tokens sorted into policies
        let _policies = groupTokensByPolicyId(_tokens);

        // number of difference projects
        // used in summary
        let _policyNumber = (Object.keys(_policies).length);

        // splits policy list into two lists - nfts and fts, then combines into object = fungObj {nfts, fts}
        let sortedTokens = sortTokenFungibilities(_policies);

        // wallet data object which is stored in local storage for quick retrieval
        walletData = {stake: stake, tokenNumber: _tokenNumber, projectNumber: _policyNumber, nfts: sortedTokens.nfts, fts: sortedTokens.fts};

      }catch(error){
        console.log(error);
        return null;
      }
    }
    return walletData;

  }

    // this method fetches the stake address for any given base address.
    // it uses a Blockfrost API which returns data for specific addresses.

    // @param - a base address, containing the stake key for its wallet.
    // @return a stake address, an account address which can be used to fetch data for its corresponding wallet
    async function getStakeFromAddress(address){
      try{
        // fetch data relating to address
        const req = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/addresses/'+address, 
          {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});

          // JSON returned contains stake address for given base address.
          const res = await req.json();
          return res.stake_address;
      }catch(error){ 
          // handle error
          return null;
      }

    }

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

      if(data[0].address != null){
        let stake = await getStakeFromAddress(data[0].address);

        if(stake != null){
          return stake;
        }
        else{
          return null;
        }
      }
      else{
        return null;
      }
    }catch(error){
      return null;
    }

  }

  // no asset limit on how many assets gets returned on one request
  // koios, blockfrost is limited by 100 results per page
  async function getAssetsFromKoios(stakeAddress){
    try{
      const req = await fetch('https://api.koios.rest/api/v0/account_assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_stake_addresses": [
            stakeAddress
          ]
        })
      });

      const res = await req.json();
      if(res[0].asset_list != null){
        return res[0].asset_list;
      }
      else{
        return null;
      }
    }catch(error){
      return null;
    }
  }

  // creates a list of 'token' objects and sorts them by price
  // token (asset_name, quantity, policy, metadata, prices, current (price))
  async function createTokens(assets){
    const _tokens = [];

    for(let i =0; i<assets.length;i++){
      setLoadingInfo('Loading tokens: '+i + ' of ' +assets.length)
      let quantity = 1;

      if(assets[i].decimals != 0){
        quantity = assets[i].quantity / (10**(assets[i].decimals));
      }

      let token = new Token(assets[i].asset_name, assets[i].policy_id, quantity);

      // return data under 'onchain_metadata' or 'metadata'
      token.metadata = await token.getMetadata();

      // returns price data if available on CoinGecko
      let prices = await token.getPrice();

      if(prices != ''){
        token.prices = prices;
      }
      else{
        token.prices = '';
        token.current = -1;
      }

      //fetch  ipfs image from metadatat
      if(token.metadata != null){
        let ipfs = token.getIpfsFromMetadata(); 
        token.ipfs = ipfs;
       _tokens.push(token);
      }
    }

    // list of 'token' objects sorted by price attribute
    let priceSorted = sortByPrice(_tokens);
    return priceSorted;
  }

  // groups list of token objects by policy Id
  function groupTokensByPolicyId(tokenList){

    // create list of policy Ids with values of tokens
    const policyList = {};
    for(const token in tokenList){
      const policyId = tokenList[token].policy_id;
      
      if(policyId in policyList){
        policyList[policyId].push(tokenList[token]);
      }else {
        policyList[policyId] = [tokenList[token]];
      }

    }
    const keys= Object.keys(policyList);

    //sort policy list by collection total
    const values = Object.values(policyList);
    values.sort((a,b) => a.length - b.length).reverse();
    const _sorted = {};
    for (let i=0;i<keys.length;i++){
      _sorted[keys[i]] = values [i];
    }
    return _sorted;
  }

  // sort tokens by price
  function sortByPrice(list) {
    return list.sort((a, b) => a.current - b.current);
  }

  // splits token by whether quantity is 1 or not (fungibility)
  // returns object of two lists - fts and nfts
  function sortTokenFungibilities(policies){
    let poly = Object.keys(policies);
    let _nfts = [];
    let _fts = [];
    for(const element of poly){
      let p = policies[element][0];
      if(p.quantity == 1){
        _nfts.push(policies[element]);
      }
      else{
        _fts.push(policies[element]);
      }
    }
    return {nfts : _nfts, fts : _fts};
  }

  // displays while token data is being fetched
  if(isLoading == 'fetching'){
    return <div>
      <div className="loading-symbol" style={{ visibility: isVisible ? 'visible' : 'hidden' }}></div>
      <label className="loading-info">{loadingInfo}</label>
    </div>
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return(
    <div className="wallet-data">
      <div className="wallet-data-header">
        <span className="wallet-button" id='h' onClick={() => scrollToTop()}>
          <span><Image src={'/home.png'} height={50} width={50} alt='home'/></span>
          <span className="tooltip">Home</span>
        </span>
        <span className="wallet-button" id='w' onClick={() => scrollToSection('wallet')}>
          <span><Image src={'/walelt.png'} height={50} width={50} alt='wallet'/></span>
          <span className="tooltip">Wallet</span>
        </span>
        <span className="wallet-button" id='n' onClick={() => scrollToSection('nfts')}>
          <span><Image src={'/images.png'} height={50} width={50} alt='NFT'/></span>
          <span className="tooltip">NFTs</span>
        </span>
        <span className="wallet-button" id='f' onClick={() => scrollToSection('fts')}>
          <span><Image src={'/cardanocoin.png'} height={50} width={50} alt='coin'/></span>
          <span className="tooltip">Coins</span>
        </span>
        <span className="wallet-button" id='t' onClick={() => scrollToSection('txs')}>
          <span><Image src={'/txs.png'} height={50} width={50} alt='txs'/></span>
          <span className="tooltip">Transactions</span>
        </span>
      </div>
      <div className="wallet-data-content">
        <section className="wallet-data-content-item" id="home" >
          <h1 className="wallet-data-content-item">Welcome to Cardano NFT Explorer</h1>
          <WalletButton stake = {props.stake} />
          <button onClick={() => scrollToSection('wallet')} className="scroll-button">Scroll<Image src={'/scroll.png'} height={50} width={50} alt ='scroll' className="scroll-image"/></button>
        </section>
        <section className="wallet-data-content-item" id="wallet" >
          <Summary data={walletData} />
          <button onClick={() => scrollToSection('nfts')} className="scroll-button">NFTs<Image src={'/scroll.png'} height={50} width={50} alt ='scroll' className="scroll-image"/></button>
        </section>
        <section className="wallet-data-content-item" id="nfts" >
          <div className="wallet-data-content-item">
            <Nfts data={walletData} />
            <button onClick={() => scrollToSection('fts')} className="scroll-button">Coins<Image src={'/scroll.png'} height={50} width={50} alt ='scroll' className="scroll-image"/></button>
          </div>
        </section>
        <section className="wallet-data-content-item" id="fts">
        <div className="wallet-data-content-item" >
          <Fts data={walletData} />
          <button onClick={() => scrollToSection('txs')} className="scroll-button">Transactions<Image src={'/scroll.png'} height={50} width={50} alt ='scroll' className="scroll-image"/></button>
        </div>
        </section>
        <section className="wallet-data-content-item" id="txs">
          <Transaction data={walletData}/>
        </section>
      </div>
    </div>

  );
}

export default WalletData;
