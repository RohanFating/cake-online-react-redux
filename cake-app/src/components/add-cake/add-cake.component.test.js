import React from 'react';
import fetchMock from 'fetch-mock';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import AddCakeComponent from './add-cake.component.js';
import configureStore from '../../store/app.store.js';
import AppConstant, { BASE_URL } from '../../constants/constants.js'
import cakeService from '../../services/cake.service';
import AppActions from '../../actions/app.actions.js';
import { mockResponse, mockAddCakeFormData } from '../../services/mock.response.js';
import Enzyme, { shallow, mount } from 'enzyme'; ``
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const store = configureStore();

/**
 * Unit testing for AddCakeComponent
 */
describe('Add Cake Component should', () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })

  it('be created without crash', () => {
    const mock = fetchMock.postOnce(BASE_URL, JSON.stringify(mockResponse));
    const root = document.createElement('div');
    let props = { cakeFormDetails: mockAddCakeFormData };
    const component = mount(
      <Provider store={store}><Router><div><Route render={() => {
        return <AddCakeComponent
          updateCakeList={(event, data) => { return updateCakeInfoList(event) }}
          cakeFormDetails={props.cakeFormDetails} />
      }}></Route></div></Router></Provider>);
    const componentInstance = component.find(AddCakeComponent).instance();
    expect(componentInstance.props.cakeFormDetails.details.name.value).toBe('My Cake');
    expect(componentInstance.props.cakeFormDetails.details.comment.value).toBe('Nice One');
    expect(componentInstance.props.cakeFormDetails.details.imageUrl.value).toBe('http://www.abc.com/abc.jpg');
    expect(componentInstance.props.cakeFormDetails.details.yumFactor).toBe(1);
  })



  it('form should be valid in case all fields as field', () => {
    const mock = fetchMock.postOnce(BASE_URL, JSON.stringify(mockResponse));
    const root = document.createElement('div');
    const props = { cakeFormDetails: mockAddCakeFormData };
    const component = mount(
      <Provider store={store}><Router><div><Route render={() => {
        return <AddCakeComponent
          updateCakeList={(event, data) => { return updateCakeInfoList(event) }}
          cakeFormDetails={props.cakeFormDetails} />
      }}></Route></div></Router></Provider>);
      const componentInstance = component.find(AddCakeComponent).instance();
    expect(componentInstance.props.cakeFormDetails.details.name.value).toBe('My Cake');
    expect(componentInstance.props.cakeFormDetails.details.comment.value).toBe('Nice One');
    expect(componentInstance.props.cakeFormDetails.details.imageUrl.value).toBe('http://www.abc.com/abc.jpg');
    expect(componentInstance.props.cakeFormDetails.details.yumFactor).toBe(1);
    expect(componentInstance.validateCompleteForm()).toBe(true);
    componentInstance.addCake();
    const subscription = store.subscribe(() => {
      const state = store.getState();
      expect(state.cakeFormDetails.details.name.value).toBe('My Cake');
      expect(state.cakeFormDetails.details.comment.value).toBe('Nice One');
      expect(state.cakeFormDetails.details.imageUrl.value).toBe('http://www.abc.com/abc.jpg');
      expect(state.cakeFormDetails.details.yumFactor).toBe(1);
      subscription();
    })
  })

  it('state should change if user enter anything in form on handleOnChange', () => {
    const mock = fetchMock.postOnce(BASE_URL, JSON.stringify(mockResponse));
    const root = document.createElement('div');
    const props = { cakeFormDetails: mockAddCakeFormData };
    const event = {
      target: {
        name: 'name',
        value: 'Brownie Cake'
      }
    };
    const component = mount(
      <Provider store={store}><Router><div><Route render={() => {
        return <AddCakeComponent
          updateCakeList={(event, data) => { return updateCakeInfoList(event) }}
          cakeFormDetails={props.cakeFormDetails} />
      }}></Route></div></Router></Provider>);
    let componentInstance = component.find(AddCakeComponent).instance();
    
    componentInstance.handleOnChange(event);
    const subscription = store.subscribe(() => {
      const state = store.getState();
      expect(state.cakeFormDetails.details.name.value).toBe('Brownie Cake');
      subscription();
    })
  })

  it('it should reset form data in resetModels method and form should not be valid', () => {
    const mock = fetchMock.postOnce(BASE_URL, JSON.stringify(mockResponse));
    const root = document.createElement('div');
    const props = { cakeFormDetails: mockAddCakeFormData };
    const component = mount(
      <Provider store={store}><Router><div><Route render={() => {
        return <AddCakeComponent
          updateCakeList={(event, data) => { return updateCakeInfoList(event) }}
          cakeFormDetails={props.cakeFormDetails} />
      }}></Route></div></Router></Provider>);
    const componentInstance = component.find(AddCakeComponent).instance();

    componentInstance.resetModels();
    expect(componentInstance.props.cakeFormDetails.details.name.value).toBe('');
    expect(componentInstance.props.cakeFormDetails.details.comment.value).toBe('');
    expect(componentInstance.props.cakeFormDetails.details.imageUrl.value).toBe('');
    expect(componentInstance.props.cakeFormDetails.details.yumFactor).toBe(1);
    expect(componentInstance.validateCompleteForm()).toBe(false);
  })
})

function updateCakeInfoList(action) {
  store.dispatch(AppActions.processAction(action));
}