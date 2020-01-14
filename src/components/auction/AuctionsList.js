import React from 'react';
import AuctionSummary from './AuctionSummary';

const AucitonsList = ({ auctions }) => {
  return (
    <div className="auctions-list section">
      {auctions && auctions.map(auction => {
          return (
            <AuctionSummary auction={auction} key={auction.id} />
          );
        })}
    </div>
  );
}

export default AucitonsList;