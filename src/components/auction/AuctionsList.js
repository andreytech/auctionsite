import React from 'react';
import AuctionSummary from './AuctionSummary';

const AucitonsList = ({ auctions }) => {
  return (
    <div className="auctions-list section" >
      {auctions && auctions.map((auction, key) => {
          return (
            <AuctionSummary auction={auction} key={key} />
          );
        })}
    </div>
  );
}

export default AucitonsList;