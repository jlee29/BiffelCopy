import receiveItemDetails from './receiveItemDetails'
import api from '../api.js'

export default function fetchItemDetails(itemID) {
  return dispatch => {

    console.log(api.get(itemID))
    //eventually this will be a database call.
    return dispatch(receiveItemDetails(api.get(itemID)));
    // return fetch(url(), {
    //   method: 'GET',
    //   mode: 'cors',
    //   credentials: 'include',
    //   headers: {
    //     'x-api-key': apiKey,
    //     'Accept': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(json => dispatch(receiveStuff(json)));
  };
}
