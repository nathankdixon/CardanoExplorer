    // gets stake address from wallet using cip-30 and lucid
    // @params - the name of the wallet to connect to e.g. 'Nami' or 'Typhon Wallet'

import { Lucid } from "./lucid-cardano";


    // @returns - the stake address of the connected wallet
   export  async function getStakeAddressFromWallet(wallet){
        try{
          // instantiates Lucid - a javascript framework which encapsulates the CIP-30 Dapp Connector
          const lucid = await Lucid.new();
  
          // api here is set to the requested wallet
          // the user is promted to connect the wallet to the site
          // if the user clicks 'connect', wallet data can be fetched
          var api = '';
      
          if(wallet == 'Typhon Wallet'){
            api = await window.cardano.typhoncip30.enable();
          }
          else if(wallet == 'eternl'){
            api = await window.cardano.eternl.enable();
          }
          else if(wallet == 'Nami'){
            api = await window.cardano.nami.enable();
          }
          else if(wallet == 'Flint Wallet'){
            api = await window.cardano.flint.enable();
          }
          else{
            return null;
          }
          lucid.selectWallet(api);
  
          // reward address (a.k.a stake address) is fetched from the wallet api
          let stake = await lucid.wallet.rewardAddress();
  
          return stake;
        }catch(error){
          return null;
        }
  
  }