import Image from 'next/image';
import React, { useState } from 'react';

const CollectionCard = ({nfts}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="collection-card">
      <div className="card-header" onMouseEnter={toggleExpand}>
        <Image src={nfts[0].ipfs} alt ={nfts[0].policyId} height={200} width={200}/>
      </div>
      {isExpanded && (
        <div className="nft-grid">
          {nfts.map((nft) => (
            <Image key={nft.asset_name} src={nft.ipfs} alt={nft.asset_name} height={200} width={200}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionCard;
