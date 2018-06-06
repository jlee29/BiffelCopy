import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import createBiffel from '../../actions/createBiffel'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import './SellItem.css'
import ipfs from '../../ipfs.js'

class SellItem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: props.title || "",
      ipfsHash: props.ipfsHash || "",
      slotPrice: props.slotPrice || 0,
      numberOfSlots: props.numberOfSlots || 0,
      bounty: props.bounty || 0
    };
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.slotPrice > 0 && this.state.numberOfSlots > 0 && this.state.bounty > 0 && this.state.ipfsHash != "";
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {

    event.preventDefault();
    var values = {...this.state};
    this.props.createBiffel(this.props.contract, this.props.userAccount, values);
  }

  captureFile =(event) => {
    console.log('capturing file')  
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
          
  }

  convertToBuffer = async(reader) => {
    console.log('converting file')
      //file is converted to a buffer for upload to IPFS
    console.log('buffer',reader.result)

    const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax

    await ipfs.add(buffer, (err, ipfsHash) => {
        // console.log(err,ipfsHash);

        this.setState({ipfsHash: ipfsHash[0].hash})
        console.log('ipfsHash',this.state.ipfsHash[0].hash)
        //setState by setting ipfsHash to ipfsHash[0].hash 
        //this.setState({ ipfsHash:ipfsHash[0].hash });
    })
  }

  render() {
    return (
      <div className="SellItem">
        <div className={`sk-cube-grid ${this.props.loading ? '' : 'off'}`}>
          <div className="divLoaderTitle">
            <h3> loading </h3>
          </div>
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
        <form className={`${this.props.loading ? 'off' : ''}`} onSubmit={this.handleSubmit}>
          <FormGroup controlId="title" bsSize="large">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Item Image</ControlLabel>
            <input 
              type = "file"
              onChange = {this.captureFile}
            />
          </FormGroup>
          <FormGroup controlId="slotPrice" bsSize="large">
            <ControlLabel>Slot Price (wei)</ControlLabel>
            <FormControl
              value={this.state.slotPrice}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <FormGroup controlId="numberOfSlots" bsSize="large">
            <ControlLabel>Number of Slots</ControlLabel>
            <FormControl
              value={this.state.numberOfSlots}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <FormGroup controlId="bounty" bsSize="large">
            <ControlLabel>Bounty (wei)</ControlLabel>
            <FormControl
              value={this.state.bounty}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            {'Create Biffel'}
          </Button>
          {this.props.error && !this.props.success ?
            (
              <Alert bsStyle='danger'>
                {this.props.error}
              </Alert>
            )
            :
            null
          }
          {this.props.success && !this.props.error ?
            (
              <Alert bsStyle='success'>
                {'Biffel created successfully'}
              </Alert>
            )
            :
            null
          }
        </form>
      </div>
    );
  }
}

SellItem.propTypes = {
  success: PropTypes.boolean,
  error: PropTypes.string
};

function mapStateToProps(state) {
  return {
    contract: state.web3.contract,
    userAccount: state.web3.userAccount,
    error: state.createBiffel.error,
    success: state.createBiffel.success,
    loading: state.createBiffel.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createBiffel: bindActionCreators(createBiffel, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellItem);
