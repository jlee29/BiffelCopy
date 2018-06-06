import initialState from './initialState';
import {ITEMS_RECEIVED} from '../actions/actionTypes';

export default function itemsReducer(state = initialState.items, action) {
  switch (action.type) {
    case ITEMS_RECEIVED:
      return action.items
    // case ITEM_CREATED:
    //   return {...state, action.item}
    // case SLOT_BOUGHT:
    //   return updateItems(state, action.item)
    default:
      return state;
  }
}

// function updateItems(state, receivedItem){
//   const isItemToUpdate = item => item.id === receivedItem.id
//   var oldItem = state.find(isItemToUpdate)
//   var newItem = = {...oldItem, ...receivedItem}
//   const listWithoutItem = state.filter((item) => item.id !== receivedItem.id)
//   return listWithoutItem.push(newItem)
// }
