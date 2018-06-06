import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {Panel, Tabs, Tab, Thumbnail} from 'react-bootstrap';

class Profile extends Component {
  constructor(props){
    super(props);
  }

  render (){

    if(this.props.items && this.props.userAccount){
      var activeBiffelsUserSeller = getActiveBiffelsUserSeller(this.props.items, this.props.userAccount);
      var activeBiffelsUserBuyer = getActiveBiffelsUserBuyer(this.props.items, this.props.userAccount);

      var inactiveBiffelsUserSeller = getInactiveBiffelsUserSeller(this.props.items, this.props.userAccount);
      var inactiveBiffelsUserBuyer = getInactiveBiffelsUserBuyer(this.props.items, this.props.userAccount);

      return (
        <div>
          <Panel bsStyle="primary">
            <Panel.Heading>
              <Panel.Title componentClass="h3">Your Ethereum Address</Panel.Title>
            </Panel.Heading>
            <Panel.Body>{this.props.userAccount}</Panel.Body>
          </Panel>

          <Tabs>
            <Tab eventKey={1} title="Your Active Biffels" enabled>
              <Panel>
                <Panel.Body>
                  {activeBiffelsUserSeller ?
                    activeBiffelsUserSeller.map(i => {
                      return(
                        <Panel>
                          <Panel.Heading>
                            <Link to={`/buy/${i.id}`}>{i.title}
                            </Link>
                          </Panel.Heading>
                        </Panel>
                      )
                    })
                  :
                    null
                  }
                </Panel.Body>
              </Panel>
            </Tab>

            <Tab eventKey={2} title="Your Active Bids" enabled>
              <Panel>
                <Panel.Body>
                  {activeBiffelsUserBuyer ?
                    activeBiffelsUserBuyer.map(i => {
                      return(
                        <Panel>
                          <Panel.Heading>
                            <Link to={`/buy/${i.id}`}>{i.title}</Link>
                          </Panel.Heading>
                        </Panel>
                      )
                    })
                  :
                    null
                  }
                </Panel.Body>
              </Panel>
            </Tab>

            <Tab eventKey={3} title="Your Past Biffels" enabled>
              <Panel>
                <Panel.Body>
                  {inactiveBiffelsUserSeller ?
                    inactiveBiffelsUserSeller.map(i => {
                      return(
                        <Panel>
                          <Panel.Heading>
                            <Link to={`/buy/${i.id}`}>{i.title}</Link>
                          </Panel.Heading>
                        </Panel>
                      )
                    })
                  :
                    null
                  }
                </Panel.Body>
              </Panel>
            </Tab>

            <Tab eventKey={4} title="Your Past Bids" enabled>
              <Panel>
                <Panel.Body>
                  {inactiveBiffelsUserBuyer ?
                    inactiveBiffelsUserBuyer.map(i => {
                      return(
                        <Panel>
                          <Panel.Heading>
                            <Link to={`/buy/${i.id}`}>{i.title}</Link>
                          </Panel.Heading>
                        </Panel>
                      )
                    })
                  :
                    null
                  }
                </Panel.Body>
              </Panel>
            </Tab>

          </Tabs>

        </div>
      )
    }
    return null
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    items: state.items,
    userAccount: state.web3.userAccount
  };
}

function getActiveBiffelsUserSeller(items, userAccount) {
  var biffelsUserSeller = items.filter(item=> item.seller == userAccount && item.isActive)
  // var biffelsUserSeller = [];
  // for(var item in items){
  //   if(items[item].seller == userAccount){
  //     biffelsUserSeller.push(items[item]);
  //   }
  // }
  return biffelsUserSeller;
}

function getInactiveBiffelsUserSeller(items, userAccount) {
  var biffelsUserSeller = [];
  for(var item in items){
    if(!items[item].isActive && items[item].seller == userAccount){
      biffelsUserSeller.push(items[item]);
    }
  }
  return biffelsUserSeller;
}

function getActiveBiffelsUserBuyer(items, userAccount) {
  var biffelsUserBuyer = [];
  for(var item in items){
    if(!items[item].isActive){
      continue;
    }
    for(var buyer in items[item].buyers){
      if(items[item].buyers[buyer] === userAccount){
        biffelsUserBuyer.push(items[item]);
        break;
      }
    }
  }
  console.log('bub',biffelsUserBuyer);
  return biffelsUserBuyer;
}

function getInactiveBiffelsUserBuyer(items, userAccount) {
  var biffelsUserBuyer = [];
  for(var item in items){
    if(items[item].isActive){
      continue;
    }
    for(var buyer in items[item].buyers){
      if(items[item].buyers[buyer] === userAccount){
        biffelsUserBuyer.push(items[item]);
        break;
      }
    }
  }
  return biffelsUserBuyer;
}

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchItemDetails: bindActionCreators(fetchItemDetails, dispatch)
//   };
// }

export default connect(
  mapStateToProps,
  null
)(Profile);
