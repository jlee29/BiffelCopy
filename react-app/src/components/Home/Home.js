import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ItemListing from '../ItemListing/ItemListing'
import DetailedItem from '../DetailedItem/DetailedItem'
import SellItem from '../SellItem/SellItem'
import Profile from '../Profile/Profile'
import './Home.css'

const Home = () => (
  <main className="home">
    <Switch>
      <Route exact path='/' component={ItemListing}/>
      <Route exact path='/buy' component={ItemListing}/>
      <Route path='/buy/:id' component={DetailedItem}/>
      <Route exact path='/sell' component={SellItem}/>
      <Route exact path='/profile' component={Profile}/>
    </Switch>
  </main>
)

export default Home
