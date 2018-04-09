import React from 'react';
import fetchMock from 'fetch-mock';
import ReactDOM from 'react-dom';
import App from './App.js';
import configureStore from './store/app.store.js';
import AppConstant,{ BASE_URL } from './constants/constants.js'
import { mockResponse } from './services/mock.response.js';
const store = configureStore();
/**
 * Unit testing for App Component
 */
describe('App Component should', () => {

      afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
      })

      it('be created without crash', () => {
        const mock = fetchMock.getOnce('*', mockResponse);
        const root = document.createElement('div');
        ReactDOM.render( < App store = {store}/>, root);
          expect(root.innerHTML.indexOf('Add you cake!')).toBeGreaterThan(-1);
      });

      it('validated Cake Info component to be loaded or not', () => {
          const mock = fetchMock.getOnce('*', mockResponse);
          const root = document.createElement('div');
          ReactDOM.render( < App store = {store}/>, root);
            store.dispatch({
              type: AppConstant.CAKE_INFO_LIST,
              data: []
            }); 
            const storeSubscription = store.subscribe(() => {
              const state = store.getState();
              expect(state.cakeInfo.cakeInfoList.length).toBe(1);
              storeSubscription();
            });
      })
})