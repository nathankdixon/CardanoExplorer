import Token from "../token";

export async function createWalletDataFromStake(stake){

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
        return null;
      }
    }
    return walletData;

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

    for(const element of assets){
      let quantity = 1;
      
      if(element.decimals != 0){
        quantity = element.quantity / (10**(element.decimals));
      }

      let token = new Token(element.asset_name, element.policy_id, quantity);

      await token.fetchTokenMetadata();
      await token.fetchTokenPrice();

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