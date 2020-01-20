import { shallow } from 'enzyme';
import React from 'react';
import AuctionsList from './AuctionsList';

test('AuctionsList snapshot', () => {
    const mockAuctions = [{
        title:'Test auction title',
        description: 'Auction description text',
        creator: {
            name: 'Auction creator'
        }
    }];
    expect(shallow(<AuctionsList auctions={mockAuctions} />)).toMatchSnapshot();
});