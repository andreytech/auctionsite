import axios from 'axios';
import { GET_AUCTIONS, ADD_AUCTION, AUCTIONS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getAuctions = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/auctions')
    .then(res =>
      dispatch({
        type: GET_AUCTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addAuction = item => (dispatch, getState) => {
  axios
    .post('/auctions', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_AUCTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// export const deleteItem = id => (dispatch, getState) => {
//   axios
//     .delete(`/api/items/${id}`, tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: DELETE_ITEM,
//         payload: id
//       })
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };

export const setItemsLoading = () => {
  return {
    type: AUCTIONS_LOADING
  };
};
