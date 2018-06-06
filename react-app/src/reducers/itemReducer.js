import initialState from './initialState';
import {INITIATE_BUY_SLOT, BUY_SLOT_SUCCESS, BUY_SLOT_FAILED, START_BIFFEL_INITIATED,
  START_BIFFEL_SUCCESS, START_BIFFEL_FAILED} from '../actions/actionTypes';

export default function itemReducer(state = initialState.item, action) {
  switch (action.type) {
    case INITIATE_BUY_SLOT:
      return {...initialState.item, loading: true};
    case BUY_SLOT_SUCCESS:
      return {error: '', success: true, loading: false};
    case BUY_SLOT_FAILED:
      return {error: action.error, success: false, loading: false};
    case START_BIFFEL_INITIATED:
      return {...initialState.item, loading: true};
    case START_BIFFEL_SUCCESS:
      return {error: '', success: true, loading: false};
    case START_BIFFEL_FAILED:
      return {error: action.error, success: false, loading: false};
    default:
      return state;
  }
}
