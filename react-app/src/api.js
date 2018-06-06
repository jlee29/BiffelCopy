const ItemAPI = {
  items: [
    {id: 0, name: "Yeezy1", slotPrice: 10 },
    {id: 1, name: "Yeezy2", slotPrice: 10 },
    {id: 2, name: "Yeezy3", slotPrice: 10 },
    {id: 3, name: "Yeezy4", slotPrice: 10 },
    {id: 4, name: "Yeezy5", slotPrice: 10 },
    {id: 5, name: "Yeezy6", slotPrice: 10 },
  ],
  all: function() { return this.items},
  get: function(id) {
    const isItem = item => item.id === id
    return this.items.find(isItem)
  }//,
}

export default ItemAPI
