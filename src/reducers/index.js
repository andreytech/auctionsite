import { combineReducers } from 'redux';
import auctionReducer from './auctionReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  auction: auctionReducer,
  error: errorReducer,
  auth: authReducer
});
