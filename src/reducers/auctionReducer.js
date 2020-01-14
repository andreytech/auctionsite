import {
  GET_AUCTIONS,
  ADD_AUCTION,
  // DELETE_ITEM,
  AUCTIONS_LOADING
} from '../actions/types';

const initialState = {
  auctions: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUCTIONS:
      return {
        ...state,
        auctions: action.payload,
        loading: false
      };
    // case DELETE_ITEM:
    //   return {
    //     ...state,
    //     items: state.items.filter(item => item._id !== action.payload)
    //   };
    case ADD_AUCTION:
      return {
        ...state,
        auctions: [action.payload, ...state.auctions]
      };
    case AUCTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
