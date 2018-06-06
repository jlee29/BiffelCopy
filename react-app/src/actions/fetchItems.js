import {ITEMS_RECEIVED} from './actionTypes';
import api from '../api.js'

export default function fetchItems(contract, userAccount) {
  return dispatch => {
    console.log('contract', contract);
    console.log('contract.methods.getBiffelCount()', contract.methods.getBiffelCount());
    contract.methods.getBiffelCount().call({from: userAccount})
    .then(count =>{
      var promises = []
      for(var id=0; id<count; id++){
        var promise = Promise.all([
          contract.methods.getBiffelSeller(id).call({from: userAccount}),
          contract.methods.getBiffelBuyers(id).call({from: userAccount}),
          contract.methods.getBiffelSlotCount(id).call({from: userAccount}),
          contract.methods.getBiffelSlotPrice(id).call({from: userAccount}),
          contract.methods.getBiffelBalance(id).call({from: userAccount}),
          contract.methods.getBiffelBounty(id).call({from: userAccount}),
          contract.methods.getBiffelStartBlock(id).call({from: userAccount}),
          contract.methods.getBiffelBountyPaidTo(id).call({from: userAccount}),
          contract.methods.getBiffelIsActive(id).call({from: userAccount}),
          contract.methods.getBiffelTitle(id).call({from: userAccount}),
          contract.methods.getBiffelWinner(id).call({from: userAccount}),
          contract.methods.getBiffelIPFSHash(id).call({from: userAccount})
        ])
        promises.push(promise)
      }
      return Promise.all(promises)
    })
    .then(result => {
      var items = []
      for(var i=0; i<result.length; i++){
        var item = {}
        item['id'] = i
        item['seller'] = result[i][0]
        item['buyers'] = result[i][1]
        item['slotCount'] = parseInt(result[i][2])
        item['slotPrice'] = parseInt(result[i][3])
        item['balance'] = parseInt(result[i][4])
        item['bounty'] = parseInt(result[i][5])
        item['startBlock'] = parseInt(result[i][6])
        item['bountyPaid'] = result[i][7]
        item['isActive'] = result[i][8]
        item['title'] = result[i][9]
        item['winner'] = (result[i][10] === '0x0000000000000000000000000000000000000000' ? null : result[i][10])
        item['ipfsHash'] = result[i][11]
        items.push(item)
      }
      dispatch({type: ITEMS_RECEIVED, items})
    })
    .catch(err => console.log(err))
  };
}
