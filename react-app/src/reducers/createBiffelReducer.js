import initialState from './initialState';
import {INITIATE_CREATE_BIFFEL, CREATE_BIFFEL_SUCCESS, CREATE_BIFFEL_FAILED} from '../actions/actionTypes';

export default function createBiffelReducer(state = initialState.createBiffel, action) {
  switch (action.type) {
    case INITIATE_CREATE_BIFFEL:
      return {...initialState.createBiffel, loading: true};
    case CREATE_BIFFEL_SUCCESS:
      return {error: '', success: true, loading: false};
    case CREATE_BIFFEL_FAILED:
      return {error: action.error, success: false, loading: false};
    default:
      return state;
  }
}
