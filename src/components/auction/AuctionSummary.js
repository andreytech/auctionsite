import React from 'react';

const AuctionsSummary = ({auction}) => {
  return (
    <div className="card z-depth-0 auction-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{auction.title}</span>
        <p>Post by the {auction.creator.name}</p>
        <p className="grey-text">{auction.description}</p>
      </div>
    </div>
  );
}

export default AuctionsSummary;