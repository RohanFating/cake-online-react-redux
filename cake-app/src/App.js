import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import './App.css';
import CakeInfoComponent from './components/cake-info/cake-info.component.js';
import AddCakeComponent from './components/add-cake/add-cake.component.js';
import CakeDetailComponent from './components/cake-details/cake-detail.component.js';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import AppActions from './actions/app.actions.js';
// import AppActionUtil from './actions/action.util.js';
class App extends Component {

  /**
   * To dispatch event 
   * @param action - actions to be dispatch 
   */
  updateCakeInfoList(action){
    this.props.store.dispatch(AppActions.processAction(action));
  }

  handleMe(){
    return true;
  }
  render() {
    return (
      <div className="container">
        <div className="text-center row">
          <div className="col-md-12 fixed-top App__heading">
             Cake Links Online Store
          </div>
        </div>
        <div className="row">
        <Provider store={this.props.store}>
          <Router>
            <div className="col-md-12">
              <Route exact path="/" render={()=> {
                return <CakeInfoComponent 
                updateCakeList ={(event)=> { return this.updateCakeInfoList(event)}} 
                cakeInfo={ this.props.cakeInfo }/> }} />
              <Route path="/cake-detail/:id" render={(match)=> {
                return <CakeDetailComponent match={match}
                cakeDetails={ this.props.cakeDetails }
                 updateCakeList ={(event)=> { return this.updateCakeInfoList(event)}}/> }} />
              <Route path="/add-cake" render={()=> {
                return <AddCakeComponent cakeFormDetails={ this.props.cakeFormDetails }  
                updateCakeList ={(event)=> { return this.updateCakeInfoList(event)}} /> }}/>
            </div>
          </Router>
          </Provider>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cakeInfo: state.cakeInfo,
    cakeFormDetails: state.cakeFormDetails,
    cakeDetails: state.cakeDetails,
  };
}

export default connect(mapStateToProps)(App);
