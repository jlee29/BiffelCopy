import {START_BIFFEL_SUCCESS, START_BIFFEL_FAILED, START_BIFFEL_INITIATED} from './actionTypes';

export default function initiateBiffel(contract, userAccount, biffelID) {
  return dispatch => {
    dispatch({type: START_BIFFEL_INITIATED})
    contract.methods.startBiffel(biffelID).send({from: userAccount})
    .then((res) => {
      console.log('res', res);
      dispatch({type: START_BIFFEL_SUCCESS});
    })
    .catch(err => {
      dispatch({type: START_BIFFEL_FAILED, error: err})
    })
  }
}
