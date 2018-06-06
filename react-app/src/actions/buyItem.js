import {BUY_ITEM} from './actionTypes';

export default function buyItem(item_id) {
  return {type: BUY_ITEM, item_id: item_id};
}
