import {CREATE_BIFFEL_SUCCESS, CREATE_BIFFEL_FAILED, INITIATE_CREATE_BIFFEL} from './actionTypes';

export default function createBiffel(contract, userAccount, values) {
  return dispatch => {
    dispatch({type: INITIATE_CREATE_BIFFEL});
    contract.methods.createBiffel(values.title, values.ipfsHash, values.numberOfSlots, values.slotPrice, values.bounty).send({from: userAccount})
    .then((res) => {
      console.log('res', res);
      dispatch({type: CREATE_BIFFEL_SUCCESS});
    })
    .catch(err => {
      dispatch({type: CREATE_BIFFEL_FAILED, error: err})
    })
  }
}
