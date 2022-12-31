import React from 'react'

const TokenGrid = ({ tokens }) => {
  return (
    <div className="grid-container">
      {tokens.map((token, index) => (
        <div key={index} className="grid-item">
          <img src={`/ipfs/${token.imageHash}`} className="item-image" />
          <div className="item-metadata">
            {/* metadata for token goes here */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TokenGrid
