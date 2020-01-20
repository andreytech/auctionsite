import {
    GET_AUCTIONS,
    ADD_AUCTION,
    // DELETE_ITEM,
    AUCTIONS_LOADING
} from '../actions/types';

import auctionReducer from './auctionReducer';

test('should return initial state', () => {
    expect(auctionReducer(undefined, {})).toEqual({
        auctions: [],
        loading: false
    });
});

test('should handle GET_AUCTIONS', () => {
    const initialState = {
        auctions: [],
        loading: true
    };
    
    expect(auctionReducer(initialState, {
        type: GET_AUCTIONS,
        payload: [{
            title: 'auc title',
            description: 'auc description',
            creator: 'user',
        }]
    })).toEqual({
        auctions: [{
            title: 'auc title',
            description: 'auc description',
            creator: 'user',
        }],
        loading: false
    });
});