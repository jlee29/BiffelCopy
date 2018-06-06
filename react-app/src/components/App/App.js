import React, { Component } from 'react'
import Header from '../Header/Header'
import Home from '../Home/Home'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import setupConnection from '../../actions/setupConnection';
import fetchItems from '../../actions/fetchItems';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.setupConnection();
  }

  componentDidUpdate(prevProps){
    console.log('this.props.web3', this.props.web3);
    if(prevProps.web3 && prevProps.web3.loading && this.props.web3.loading === false){
      if(!this.props.web3.error){
        console.log('fetchItems');
        this.props.fetchItems(this.props.web3.contract, this.props.web3.userAccount);
      }
    }
  }

  render(){
    if(this.props.web3 && this.props.web3.userAccount){
      return (
        <div>
          <Header/>
          <Home/>
        </div>
      )
    }
    return (
      <div className="MetamaskError">
        <img id="MetmaskErrorLogo" src="https://thumb.ibb.co/ctNaSo/34497858_1998022223846047_6463238276474994688_n.png"></img>
        <h3 id="MetamaskErrorTitle"> biffel </h3>
        <p> Please Log In To Metamask </p>
        <a href="https://metamask.io/"> Learn More </a>
      </div>
    )
  }
}


App.propTypes = {
  web3: PropTypes.object,
  setupConnection: PropTypes.func,
  fetchItems: PropTypes.func
};

function mapStateToProps(state) {
  return {
    web3: state.web3
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setupConnection: bindActionCreators(setupConnection, dispatch),
    fetchItems: bindActionCreators(fetchItems, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(App));
