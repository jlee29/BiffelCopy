import {RECEIVE_CATALOG} from './actionTypes';

export default function receiveCatalog(items) {
  return {type: RECEIVE_CATALOG, items: items};
}
