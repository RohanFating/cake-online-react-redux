import React from 'react';
import fetchMock from 'fetch-mock';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import CakeInfoComponent from './cake-info.component.js';
import configureStore from '../../store/app.store.js';
import AppConstant,{ BASE_URL } from '../../constants/constants.js'
import cakeService from '../../services/cake.service';
import AppActions from '../../actions/app.actions.js';
import {mockResponse} from '../../services/mock.response.js';
const store = configureStore();

/**
 * Unit testing for CakeInfoComponent
 */
describe('Cake Info Component should', () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('be created without crash', ()=>{
    const mock = fetchMock.getOnce(BASE_URL, JSON.stringify(mockResponse));
    const root = document.createElement('div');
    const props = { cakeInfo: {cakeInfoList: []} };
    ReactDOM.render(
    <Provider store={store}><Router><div><Route render={()=>{ return <CakeInfoComponent 
        updateCakeList ={(event, data)=> { return updateCakeInfoList(event)}} 
        cakeInfo={ props.cakeInfo }/> }}></Route></div></Router></Provider>, root);

        const storeSubscription = store.subscribe(() => {
            const state = store.getState();
            expect(state.cakeInfo.cakeInfoList.length).toBe(1);
            expect(state.cakeInfo.isError).toBe(false);
            storeSubscription();
      });
  })

  it('render error view incase cake info list api fails', ()=>{
    const mock = fetchMock.getOnce(BASE_URL, { status: 401, body: 'Error Response ' });
    const root = document.createElement('div');
    const props = { cakeInfo: {cakeInfoList: []} };
    ReactDOM.render(
    <Provider store={store}><Router><div><Route render={()=>{ return <CakeInfoComponent 
        updateCakeList ={(event, data)=> { return updateCakeInfoList(event)}} 
        cakeInfo={ props.cakeInfo }/> }}></Route></div></Router></Provider>, root);

        const storeSubscription = store.subscribe(() => {
            const state = store.getState();
            expect(state.cakeInfo.isError).toBe(true);
            storeSubscription();
      })
  })

})

function updateCakeInfoList(event) {
AppActions.processAction( event, store.dispatch );
}