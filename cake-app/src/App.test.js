import React from 'react';
import fetchMock from 'fetch-mock';
import ReactDOM from 'react-dom';
import App from './App.js';
import configureStore from './store/app.store.js';
import AppConstant,{ BASE_URL } from './constants/constants.js'
import { mockResponse } from './services/mock.response.js';
const store = configureStore();

import Enzyme,{ shallow, mount } from 'enzyme';``
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
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
        let component = mount( < App store = {store}/>);
        let instance = component.find(App).instance();
        expect(component.find(App).length).toBe(1);
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