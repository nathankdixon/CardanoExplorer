
// if metadata has been fetched
// find the ipfs link under 'image' metadata tag and store it
export function getIpfsFromMetadata (metadata){
    const keys = Object.keys(metadata);
    const values = Object.values(metadata);
    let ipfs = "";
    for(let i=0;i<keys.length;i++){


      if(keys[i] == "image"){
        ipfs = values[i];
      }
      
      // fungible tokens will have a 'logo' instead of 'image' tag
      else if(keys[i] == "logo"){
        return "data:image/png;base64,"+values[i];
      }
    }
    // convert all ipfs formats to the a searchable format that can be fetched in a <img> tag
    try{

      // links are sometimes stored in arrays
      // this finds ipfs links in the array
      if(Array.isArray(ipfs)){
        let newipfs = "";
        for(const element of ipfs){
          newipfs = newipfs + element;
        }

        if(newipfs.startsWith('ipfs://')){
          newipfs = newipfs.slice(7);
          if(newipfs.startsWith('ipfs/')){
            newipfs = newipfs.slice(5);
          }
          newipfs = "http://dweb.link/ipfs/"+newipfs;
        }

        else if(newipfs.startsWith('ipfs/')){
          newipfs = newipfs.slice(5);
          newipfs = "http://dweb.link/ipfs/"+newipfs;
        }

        else if(newipfs.startsWith('Qm')){
          newipfs = "http://dweb.link/ipfs/"+newipfs;
        }
        return newipfs;
      }

      // normal ipfs in image tags
      if(ipfs.startsWith('ipfs://')){
        ipfs = ipfs.slice(7);
        if(ipfs.startsWith('ipfs/')){
          ipfs = ipfs.slice(5);
        }
        ipfs = "http://dweb.link/ipfs/"+ipfs;
      }
      else if(ipfs.startsWith('ipfs/')){
        ipfs = ipfs.slice(5);
        ipfs = "http://dweb.link/ipfs/"+ipfs;
      }
      else if(ipfs.startsWith('Qm')){
        ipfs = "http://dweb.link/ipfs/"+ipfs;
      }

    }catch{
      return '/black.jpeg';
    }

    if(ipfs.startsWith('ba')){
      ipfs = "http://dweb.link/ipfs/"+ipfs;
    }
    return ipfs;
  }
