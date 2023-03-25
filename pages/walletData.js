import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Delegation from "./delagation";
import Fts from "./fts";
import Home from "./home";
import Nfts from "./nfts";
import SearchBar from "./searchbar";
import Summary from "./summary";
import Token from "./token";
import Transaction from "./transactions";
import WalletButton from "./walletButton";


function WalletData (props) {

  const [walletData, setWalletData] = useState({stake: null, tokenNumber: 0, projectNumber: 0, nfts: [], fts: []});
  const [stakeAddress, setStakeAddress] = useState(null);
  const [loadedTokens, setLoadedTokens] = useState('-');
  const [currency, setCurrency] = useState({name: 'USD', value: {price : 1, change24hr: 0}, symbol: '$'});
  const [prices, setPrices] = useState({usd: 1, gbp: 1, btc: 1, eth:1, eur: 1});



  const router = useRouter();

  useEffect(() => {
    setCurrency({name: 'USD', value: prices.usd, symbol: '$'});
  },[prices]);

  useEffect(() => {
    const getTokens = async () =>{

      if(props.stake != null){
  
          // props passed from [stake].js
          let stakeAddress = props.stake;

          if(stakeAddress[0] == ('$')){
            let stake = await getAddressFromHandle(stakeAddress.slice(1));
            stakeAddress = stake;
          }
          setStakeAddress(stakeAddress);

      }
    }
    getTokens();
  }, [props.stake]);

  useEffect(() => {
    const getWalletData = async () => {
      if(stakeAddress != null){
        let walletData = '';

        if(localStorage.getItem(stakeAddress) != null){
          walletData = JSON.parse(localStorage.getItem(stakeAddress));
        }
        else{
          walletData = await createWalletDataFromStake(stakeAddress);
           localStorage.setItem(stakeAddress, JSON.stringify(walletData));

        }
        setWalletData(walletData);
        setLoadedTokens('scroll to view wallet')


      }
    }
    getWalletData();
  }, [stakeAddress]);

  useEffect(() => {
    scrollToSection('wallet');

  },[walletData]);


  // creates savable wallet data object
  // which gets stored in local storage

  // stake address
  // number of tokens
  // number of projects
  // list of nfts
  // list of fts
  // 
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
        deleteLocalStorage(stake);
        return null;
      }
    }
    return walletData;

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

  async function getStakeFromAddress(addresss){
    let req = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/addresses/'+addresss,
    {headers:{project_id: 'mainnetoW61YYSiOoLSaNQ6dzTrkAG4azXVIrvh', 'cache-control': 'max-age=31536000'}});

    let res = await req.json();

    return res.stake_address;
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
      setLoadedTokens('loading '+i+'/'+assets.length);
      let quantity = 1;


      if(assets[i].decimals != 0){
        quantity = assets[i].quantity / (10**(assets[i].decimals));
      }

      let token = new Token(assets[i].asset_name, assets[i].policy_id, quantity);

      await token.fetchTokenData();
      await token.getPrice();

      _tokens.push(token);
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

  const scrollToSection = (id) => {
    
    const element = document.getElementById(id);
    if(element != null){
    element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function deleteLocalStorage(){
    localStorage.removeItem(props.stake);
    window.location.reload();
    router.reload();
  }

  function setPriceData (data){
    console.log(data);
    setPrices(data);
  }

  function changeCurrency(){
    if(prices == null){
      return;
    }
    else{
      if(currency.name == 'ADA'){
        setCurrency({name:'USD', value: prices.usd, symbol: '$'});
      }
      else if (currency.name == 'USD'){
        setCurrency({name:'EUR', value:  prices.eur, symbol: '€'});
      }
      else if(currency.name == 'EUR'){
        setCurrency({name:'BTC', value:  prices.btc, symbol: '฿'});
      }
      else if(currency.name == 'BTC'){
        setCurrency({name:'ETH', value: prices.eth, symbol: 'Ξ'});
      }
      else{
        setCurrency({name:'ADA', value: {price: 1, change24hr: 0}, symbol: '₳'});
    }
  }
  }

  return(
    <div className="wallet-data">
        <header className="home-header">
          <h1>Cardano Explorer</h1>
          <SearchBar/>
          <button onClick={deleteLocalStorage} className="refresh-button"><Image src={'/refresh.png'} className='arrow'width = {30} height={30} alt='refresh wallet'/></button>
          <button className="currency-button" onClick={() => changeCurrency()}>Currency: {currency.name}</button>
          <WalletButton/>
      </header>
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
      </div>
      <div className="wallet-data-content">
        <section className="wallet-data-content-item" id="home" >
          <Home data={walletData} prices = {setPriceData} currency = {currency}/>
          <div style={{fontSize: 'xx-large', color:"white"}}>{loadedTokens}</div>
        </section>
        {walletData.stake && (
          <div>
            <section className="wallet-data-content-item" id="wallet" >
              <Summary data={walletData} currency = {currency}/>
            </section>
            <section className="wallet-data-content-item" id="nfts" >
              <Nfts data={walletData} />
            </section>
            <section className="wallet-data-content-item" id="fts">
              <Fts data={walletData} currency = {currency}/>
            </section>
          </div>)}
      </div>
    </div>

  );
}

export default WalletData;
