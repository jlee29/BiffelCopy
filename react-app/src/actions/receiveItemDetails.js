import {RECEIVE_ITEM_DETAILS} from './actionTypes';

export default function receiveItemDetails(item) {
  console.log('item', item);
  return {type: RECEIVE_ITEM_DETAILS, item: item};
}
