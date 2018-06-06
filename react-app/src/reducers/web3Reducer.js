import initialState from './initialState';
import {SETUP_CONNECTION_SUCCESS, SETUP_CONNECTION_FAILURE, SETUP_CONNECTION_LOADING,
  RECEIVED_BLOCK_NUMBER, FETCH_BLOCK_NUMBER_FAILED} from '../actions/actionTypes';

export default function web3Reducer(state = initialState.web3, action) {
  switch (action.type) {
    case SETUP_CONNECTION_LOADING:
      return {...state, loading: true}
    case SETUP_CONNECTION_SUCCESS:
      return {...state, contract: action.contract, userAccount: action.userAccount, loading: false};
    case SETUP_CONNECTION_FAILURE:
      return {...state, error: action.error, loading: false};
    case RECEIVED_BLOCK_NUMBER:
      return {...state, blockNumber: action.blockNumber}
    case FETCH_BLOCK_NUMBER_FAILED:
      return {...state, blockNumber: null}
    default:
      return state;
  }
}
