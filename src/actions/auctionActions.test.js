import {
    AUCTIONS_LOADING
} from '../actions/types';

import { getAuctions } from './auctionActions';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware]);

test('handles requesting auctions', () => {
    const store = mockStore();
    store.dispatch(getAuctions());
    const action = store.getActions();
    const expectedAction = {
        type: AUCTIONS_LOADING
    };
    expect(action[0]).toEqual(expectedAction);
});