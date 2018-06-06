import {BUY_SLOT_SUCCESS, BUY_SLOT_FAILED, INITIATE_BUY_SLOT} from './actionTypes';

export default function buySlot(contract, userAccount, biffelID, value) {
  return dispatch => {
    dispatch({type: INITIATE_BUY_SLOT});
    contract.methods.buySlot(biffelID).send({from: userAccount, value})
    .then((res) => {
      console.log('res', res);
      dispatch({type: BUY_SLOT_SUCCESS});
    })
    .catch(err => {
      dispatch({type: BUY_SLOT_FAILED, error: err})
    })
  }
}
