import React from 'react';
import fetchMock from 'fetch-mock';
import ReactDOM from 'react-dom';
import CakeDetailComponent from './cake-detail.component.js';
import configureStore from '../../store/app.store.js';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import AppConstant,{ BASE_URL } from '../../constants/constants.js'
import cakeService from '../../services/cake.service';
import AppActions from '../../actions/app.actions.js';
import {mockResponse} from '../../services/mock.response.js';
const store = configureStore();

describe('Cake Details Component should', () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('be created without crash and get complete cake details data', ()=>{
    const mock = fetchMock.getOnce(`${BASE_URL}/sdfdsfreff45w23`, JSON.stringify(mockResponse[0]));
    const root = document.createElement('div');
    const props = {details: mockResponse[0]};
    let match = { match: { params: { id: 'sdfdsfreff45w23'}}};
    ReactDOM.render(
    <Provider store={store}><Router><div><Route render={()=>{ return <CakeDetailComponent match={match}
        updateCakeList ={(event, data)=> { return updateCakeInfoList(event)}} 
        cakeDetails={ props }/> }}></Route></div></Router></Provider>, root);

        const storeSubscription = store.subscribe(() => {
          const state = store.getState();
          expect(state.cakeDetails.details.name).toBe('My Cake');
          expect(root.getElementsByTagName('img')[0].src).toBe('http://www/ab.com/abc.jpg');
          expect(state.cakeDetails.isError).toBe(false);
          storeSubscription();
      })
  })

  it('be created without crash and get complete cake details data', ()=>{
    fetchMock.getOnce(`${BASE_URL}/sdfdsfreff45w23`, { status: 401, body: 'Error Response ' });
    const root = document.createElement('div');
    const props = {details: mockResponse[0], isError: true };
    let match = { match: { params: { id: 'sdfdsfreff45w23'}}};
    const state = store.getState();
    ReactDOM.render(
    <Provider store={store}><Router><div><Route render={()=>{ return <CakeDetailComponent match={match}
        updateCakeList ={(event, data)=> { return updateCakeInfoList(event)}} 
        cakeDetails={ props }/> }}></Route></div></Router></Provider>, root);

        const storeSubscription = store.subscribe(() => {
        const state = store.getState();
        
        expect(state.cakeDetails.isError).toBe(true);
        expect( root.innerHTML.indexOf('Service Error, Please try later!')>-1).toBe(true);
        storeSubscription();
      })
  })

})

function updateCakeInfoList(event) {
AppActions.processAction( event, store.dispatch );
}

function mapStateToProps(state) {
  return {
    cakeFormDetails: state.cakeFormDetails,
  };
}