import { shallow } from 'enzyme';
import React from 'react';
import AuctionSummary from './AuctionSummary';

test('AuctionSummary snapshot', () => {
    const mockAuction = {
        title:'Test auction title',
        description: 'Auction description text',
        creator: {
            name: 'Auction creator'
        }
    };
    expect(shallow(<AuctionSummary auction={mockAuction} />)).toMatchSnapshot();
});