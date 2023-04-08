// Refactored parseUrlParameter function
export async function parseUrlParameter(query) {
    if (query) {
      let item = query;
  
      if (item.startsWith('stake')) {
        return 'WalletData';
      } else if (item.startsWith('$')) {
        return 'WalletDataFromHandle';
      } else if (item.startsWith('addr')) {
        return 'WalletDataFromAddress';
      } else if (item.length == 56) {
        return 'PolicyData';
      } else {
        return 'AssetData';
      }
    }
    return null;
  }
