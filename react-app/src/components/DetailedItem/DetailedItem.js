import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import buySlot from '../../actions/buySlot';
import initiateBiffel from '../../actions/initiateBiffel';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, ControlLabel, Alert, Panel, Radio, Image, Table , Tab, Tabs, ListGroup, ListGroupItem} from "react-bootstrap";
import './DetailedItem.css';

class DetailedItem extends Component {
  constructor(props) {
    super(props);
    this.handleBuySlot = this.handleBuySlot.bind(this);
    this.handleInitiateBiffel = this.handleInitiateBiffel.bind(this);
    this.displayBuySlotButton = this.displayBuySlotButton.bind(this);
  }

  handleBuySlot(){
    var item = this.props.items[this.props.match.params.id]
    var value = item.slotPrice + item.bounty
    console.log('value', value);
    this.props.buySlot(this.props.contract, this.props.userAccount, this.props.match.params.id, value);
  }

  handleInitiateBiffel(){
    this.props.initiateBiffel(this.props.contract, this.props.userAccount, this.props.match.params.id);
  }

  displayBuySlotButton(){
    var item = this.props.items[this.props.match.params.id]
    console.log('this.props.blockNumber', this.props.blockNumber);
    if(item.startBlock === 0){
      return (
        <Button onClick={this.handleBuySlot}>
          {'Buy Slot'}
        </Button>
      )
    }
    return null
  }

  displayInitiateBiffelButton(){
    var item = this.props.items[this.props.match.params.id]
    if(item.startBlock === 0){
      return null;
    }
    console.log('this.props.blockNumber', this.props.blockNumber);
    if(this.props.blockNumber && this.props.blockNumber - item.startBlock > 1){
      return (
        <Button onClick={this.handleInitiateBiffel}>
          {'Initiate Biffel'}
        </Button>
      )
    }
    return null
  }

  render(){
    if(this.props.items === null){
      return null
    }

    let id = parseInt(this.props.match.params.id);

    if (isNaN(id)) {
      return <div>Sorry, but no item</div>
    }

    var item = this.props.items[id]
    if(item.winner){
      return (
        <Panel bsStyle={item.winner === this.props.userAccount ? 'success' : 'danger'}>
          <Panel.Heading>
            <Panel.Title>{`${item.title} (#${item.id})`}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Panel bsStyle={item.winner === this.props.userAccount ? 'success' : 'danger'}>
              <Panel.Heading>
                <Panel.Title componentClass="h2">{'Winner'}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{item.winner}</Panel.Body>
            </Panel>
            <Panel bsStyle={item.winner === this.props.userAccount ? 'success' : 'danger'}>
              <Panel.Heading>
                <Panel.Title componentClass="h2">{'Result'}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{item.winner === this.props.userAccount ? 'You won!' : 'Not You'}</Panel.Body>
            </Panel>
          </Panel.Body>
        </Panel>
      )
    }
    return (
      <div>
        <div className="detail" >
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
        </div>
        <Panel className={`${this.props.loading ? 'off' : ''}`} bsStyle="primary">
          <Panel.Heading>
            <Panel.Title>{`${item.title} (#${item.id})`}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <div className="DIFlexContainer">
              {item.ipfsHash !== "" ?
                ( <div className="imgContainerDI">
                    <Image className="itemImgDI" src={"https://ipfs.io/ipfs/" + item.ipfsHash} responsive></Image>
                  </div>
                )
              :
                null
              }
              <div className="DIFlexContainerInfo">
                <Tabs className="DITabs">
                  <Tab eventKey={1} title="Item Info" enabled className="DITab1">
                    <div className="DIFlexContainerTables">
                      <Table>
                        <thead>
                          <tr>
                            <th>Slot Price</th>
                            <th>Bounty Price</th>
                            <th>Active?</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{item.slotPrice} wei</th>
                            <th>{item.bounty} wei</th>
                            <th>{item.isActive ?
                              (
                                'Yes'
                              )
                            :
                              (
                                'No'
                              )
                            }</th>
                          </tr>
                        </tbody>
                      </Table>

                      <Table>
                        <thead>
                          <tr>
                            <th>Slot Count</th>
                            <th>Slots Remaining</th>
                            <th>Your Slots</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{item.slotCount}</th>
                            <th>{item.slotCount - item.buyers.length}</th>
                            <th>{item.seller == this.props.userAccount ?
                              (
                                'N/A'
                              )
                            :
                              (
                                getSlotsOwned(item.buyers,this.props.userAccount)
                              )
                            }</th>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Tab>

                  <Tab eventKey={2} title="Buyers" enabled>
                    <ListGroup className="DIListGroup">
                      {item.buyers ?
                        item.buyers.map(i => {
                          return (<ListGroupItem>{i}</ListGroupItem>)
                        })
                      :
                        null
                      }
                    </ListGroup>
                  </Tab>
                </Tabs>
                
              </div>
            </div>
            
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h2">{'Item Seller'}</Panel.Title>
              </Panel.Heading>
              {item.seller != this.props.userAccount ?
                (
                  <Panel.Body className='panel-body'>{item.seller}</Panel.Body>
                )
              :
                (
                  <Panel.Body className='panel-body'> You </Panel.Body>
                )
              }
              
            </Panel>
            {this.props.userAccount !== item.seller ?
              (
                this.displayBuySlotButton()
              )
              :
              null
            }
            {this.displayInitiateBiffelButton()}
          </Panel.Body>
        </Panel>
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
                {'Slot bought successfully'}
              </Alert>
            )
            :
            null
          }
      </div>
    )
  }
}

DetailedItem.propTypes = {
  items: PropTypes.array
};

function getSlotsOwned(buyers, myAccount){
  var count = 0;
  for(let buyer of buyers){
    if(buyer === myAccount){
      count += 1;
    }
  }
  return count;
}

function mapStateToProps(state) {
  return {
    items: state.items,
    web3: state.web3.web3,
    contract: state.web3.contract,
    userAccount: state.web3.userAccount,
    blockNumber: state.web3.blockNumber,
    loading: state.item.loading,
    error: state.item.error,
    success: state.item.success,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buySlot: bindActionCreators(buySlot, dispatch),
    initiateBiffel: bindActionCreators(initiateBiffel, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailedItem);
