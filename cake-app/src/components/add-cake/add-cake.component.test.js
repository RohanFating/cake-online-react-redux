import React from 'react';
import fetchMock from 'fetch-mock';
import ReactDOM from 'react-dom';
import AddCakeComponent from './add-cake.component.js';
import configureStore from '../../store/app.store.js';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import AppConstant, { BASE_URL } from '../../constants/constants.js'
import cakeService from '../../services/cake.service';
import AppActions from '../../actions/app.actions.js';
import { mockResponse, mockAddCakeFormData } from '../../services/mock.response.js';
import { initialState } from '../../reducer/add-cake.reducer.js';

const store = configureStore();
describe('Add Cake Component should', () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('be created without crash', () => {
    const mock = fetchMock.postOnce(BASE_URL, JSON.stringify(mockResponse));
    const root = document.createElement('div');
    let props = { cakeFormDetails: mockAddCakeFormData };
    let component = ReactDOM.render(
      <Provider store={store}><Router><div><Route render={() => {
        return <AddCakeComponent
          updateCakeList={(event, data) => { return updateCakeInfoList(event) }}
          cakeFormDetails={props.cakeFormDetails} />
      }}></Route></div></Router></Provider>, root);

    expect(root.getElementsByTagName('input')[0].value).toBe('My Cake');
    expect(root.getElementsByTagName('input')[1].value).toBe('http://www.abc.com/abc.jpg');
    expect(root.getElementsByTagName('input')[2].value).toBe('Nice One');
    expect(root.getElementsByTagName('select')[0].value).toBe('1');
  })
})

function updateCakeInfoList(event) {
  AppActions.processAction(event, store.dispatch);
}