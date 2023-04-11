import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Prices from "./prices";
import SearchBar from "./searchbar";
import Token from "./token";
import WalletButton from "./walletButton";

function AssetData(props) {
  const [token, setToken] = useState({
    name: "",
    policy: "",
    quantity: 0,
    metadata: null,
    ipfs: "/black.jpeg",
    decoded_name: "",
  });
  const [asset, setAsset] = useState(null);
  const [ipfs, setIpfs] = useState("/black.jpeg");
  const [prices, setPrices] = useState({});
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [onchainMetadata, setOnchainMetadata] = useState({});
  const [rank, setRank] = useState(0);
  const [policy, setPolicy] = useState("");
  const [floorPrice, setFloorPrice] = useState(0);

  useEffect(() => {
    if(props.assetId != null){
      setAsset(props.assetId);
    }
  })

  useEffect(() => {
    const getTokenData = async () => {
      if (props.assetId == null) {
      } else {
        let assetId = props.assetId;

        let policy = assetId.substring(0, 56);
        let name = assetId.substring(56);
        let token = new Token(name, policy, 1);
        setPolicy(policy);
        await token.fetchTokenMetadata();
        setToken(token);
        setOnchainMetadata(token.onchain_metadata);
        setMetadata(token.metadata);
        if (token.ipfs != null && token.ipfs != "") {
          setIpfs(token.ipfs);
        }
        let assetData = await fetchAssetData(assetId);
        let ownerData = await fetchOwner(assetId);
        if(ownerData.length == 0){
          setOwner("No owner");
        }
        else{
          setOwner(ownerData[0].payment_address);
        }



        let policyData = await fetchPolicyData(policy);
        setFloorPrice(policyData.floor_price/1000000);
        setName(assetData.name);
        setRank(assetData.rarity_rank);
        setAttributes(assetData.traits);
      }
    };
    getTokenData();
  }, [asset]);


  async function fetchAssetData(asset) {
    let req = await fetch("https://api.opencnft.io/1/asset/" + asset);
    let data = await req.json();
    return data;
  }

  async function fetchPolicyData(policy) {
    let req = await fetch("https://api.opencnft.io/1/policy/" + policy);
    let data = await req.json();
    return data;
  }

  async function fetchOwner(asset) {
    try{
      let policy = asset.substring(0, 56);
      let name = asset.substring(56);
      let response = await fetch("https://api.koios.rest/api/v0/asset_nft_address?_asset_policy=" + policy + "&_asset_name=" + name);
      if(!response.ok){
        return null;
      }
      let data = await response.json();
      return data;
    }
    catch(e) {
      return null;
    }
  }

  const isUrl = (value) => {
    try {
      if (!value.startsWith("www") && !value.startsWith("ipfs") && !value.startsWith("http") && !value.startsWith("https")) {
        return false;
      }
      const url = new URL(value.startsWith("http") ? value : "https://" + value);
      return url.protocol === "http:" || url.protocol === "https:" || value.startsWith("ipfs://");
    } catch {
      return false;
    }
  };

  const createAttributeTable = (input) => {
    if (!input || typeof input !== 'object') {
      return <p>No attributes found.</p>;
    }
  
    const attributes = Object.entries(input)
      .map(([key, value]) => {
        if (key.startsWith('attributes[SEP]')) {
          return [key.replace('attributes[SEP]', ''), value];
        }
        if (key === 'traits' && Array.isArray(value)) {
          return [key, value.join(', ')];
        }
        return [key, value];
      });
  
    return (
      <table>
        <tbody>
          {attributes.map(([key, value], index) => (
            <tr key={index}>
              <td className="key">{key}:</td>
              <td>
              {isUrl(value) ? (
                value.startsWith("ipfs://") ? (
                  <a href={`https://dweb.link/ipfs/${value.substring(7)}`} target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                ) : (
                  <a href={value.startsWith("http") ? value : "https://" + value} target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                )
              ) : (
                value
              )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  function createNestedTable(input) {
    if (!input || typeof input !== 'object') {
      return <p>No data found.</p>;
    }
  
    const maxLength = 300; // Change this value to your preferred max length
  
    const processValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        return createNestedTable(value);
      } else {
        if (isUrl(value)) {
          if (value.startsWith("ipfs://")) {
            const ipfsHash = value.substring(7);
            const ipfsGatewayUrl = `https://dweb.link/ipfs/${ipfsHash}`;
            return <a href={ipfsGatewayUrl} target="_blank" rel="noopener noreferrer">{value}</a>;
          }
        }
  
        if (typeof value === 'string' && value.length > maxLength) {
          const shortenedValue = value.substring(0, maxLength) + '...';
          return (
            <>
              {shortenedValue}
              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  alert('Value copied to clipboard');
                }}
              >
                Copy value
              </button>
            </>
          );
        }
  
        return value;
      }
    };
  
    return (
      <table>
        <tbody>
          {Object.entries(input).map(([key, value], index) => (
            <tr key={index}>
              <td className="key">{key}:</td>
              <td className="value-td">{processValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  
  function clearLocalStorage(){
    localStorage.clear();
    window.location.reload();
    router.reload();
  }
  
  return (
    <div className="assetData">
      <header className="home-header">
        <div className="main-title">Cardano Explorer</div>
        <SearchBar />
        <button className="currency-button">Currency: USD</button>
        <WalletButton />
      </header>
      <div className="asset-display">
        <div className="asset-item">
          <div className="asset-text">
            <div className="asset-title">{name}</div>
          </div>
          <div className="asset-text">
          <div>Policy ID: <Link href={"/"+ policy}>{policy}</Link></div>
          </div>
        </div>
        <div className="asset-item">
          <Image
            className="asset-img"
            src={ipfs}
            alt="failed to load image"
            width={600}
            height={600}
            quality={100}
          />
        </div>
        <div className="asset-text">
            <div>
              Current Owner: <Link href={"/" + owner}>{owner.substring(0,20)+'...'}</Link>
            </div>
            <div>
              Floor Price: {floorPrice} ADA
            </div>
          </div>
        <div className="asset-item-data">
          <div className="asset-text">
            <div className="asset-text-header">Traits:</div>
            {createAttributeTable(attributes)}
          </div>
          <div className="asset-text">
            <div className="asset-text-header">On-Chain Metadata:</div>
            {createNestedTable(onchainMetadata)}
          </div>
          <div className="asset-text">
            <div className="asset-text-header">Off-Chain Metadata:</div>
            {createNestedTable(metadata)}
          </div>
          <div className="asset-text">
            <div className="asset-text-header">Rarity Rank: </div>{rank}
          </div>
          <div className="asset-text">
          <div className="asset-text-header">Links:</div><a href={"http://jpg.store/asset/"+props.assetId}><Image src={'/jpg.svg'} alt='jpg' width={80} height={80}/></a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AssetData;

