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

  const [ipfs, setIpfs] = useState("/black.jpeg");
  const [prices, setPrices] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [onchainMetadata, setOnchainMetadata] = useState({});
  const [rank, setRank] = useState(0);
  const [policy, setPolicy] = useState("");
  const [floorPrice, setFloorPrice] = useState(0);

  useEffect(() => {
    const getTokenData = async () => {
      if (props.assetId == null) {
        console.log("asset ID was undefined");
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
        //setOwner(token.txs[0].address);
        let assetData = await fetchAssetData(assetId);
        let ownerData = await fetchOwner(assetId);
        setOwner(ownerData[0].payment_address);
        let policyData = await fetchPolicyData(policy);
        setFloorPrice(policyData.floor_price/1000000);
        console.log(policyData);
        setName(assetData.name);
        setRank(assetData.rarity_rank);
        setAttributes(assetData.traits);
      }
    };
    getTokenData();
  }, [props]);

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
    let policy = asset.substring(0, 56);
    let name = asset.substring(56);
    let req = await fetch("https://api.koios.rest/api/v0/asset_nft_address?_asset_policy=" + policy + "&_asset_name=" + name);
    let data = await req.json();
    console.log(data);
    if(data.length == 0) {
      return [{payment_address: "Unknown"}];
    }

    return data;
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
          return <a href={value.startsWith("http") ? value : "https://" + value} target="_blank" rel="noopener noreferrer">{value}</a>;
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
              <td>{processValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function setPriceData (data) {
    setPrices(data);
  }
  
  
  return (
    <div>
      <header className="home-header">
        <h1>Cardano Explorer</h1>
        <SearchBar />
        <button className="currency-button">Currency: USD</button>
        <WalletButton />
      </header>
      <div className="asset-display">
        <div className="asset-item">
          <div className="asset-text">
            <h2 style={{marginTop: 30}}>{name}</h2>
          </div>
          <div className="asset-text">
          <h3>Policy ID: <Link href={"/"+ policy}>{policy}</Link></h3>
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
            <h3>
              Current Owner: <Link href={"/" + owner}>{owner.substring(0,15)+'...'}</Link>
            </h3>
            <h3>
              Floor Price: {floorPrice} ADA
            </h3>
          </div>
        <div className="asset-item-data">
        <div className="asset-text">
          </div>
          <div className="asset-text">
            <h2>Traits:</h2>
            {createAttributeTable(attributes)}
          </div>
          <div className="asset-text">
            <h2>On-Chain Metadata:</h2>
            {createNestedTable(onchainMetadata)}
          </div>
          <div className="asset-text">
            <h2>Off-Chain Metadata:</h2>
            {createNestedTable(metadata)}
          </div>
          <div className="asset-text">
            <h2>Rarity Rank: </h2>{rank}
          </div>
          <div className="asset-text">
          <h2>Links:</h2><a href={"http://jpg.store/asset/"+props.assetId}><Image src={'/jpg.svg'} alt='jpg' width={80} height={80}/></a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AssetData;

