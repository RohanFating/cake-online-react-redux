import React from 'react';
import fetchMock from 'fetch-mock';
import configureStore from '../store/app.store.js';
import AppConstant,{ BASE_URL } from '../constants/constants.js'
import AppActions from './app.actions.js';
import { mockResponse, mockAddCakeFormData } from '../services/mock.response.js';

/**
 * Unit testing for AppActions
 */
describe('App Actions should', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    })

    /**
     * Unit test for get cake info list api calls
     */
    it('get cake info list', () => {
        const store = configureStore();
        fetchMock.getOnce(BASE_URL, JSON.stringify(mockResponse))
        store.dispatch(AppActions.processAction({ type: AppConstant.CAKE_INFO_LIST, data: [] }));
        const storeSubscription = store.subscribe(() => {
            const state = store.getState();
            expect(state.cakeInfo.cakeInfoList.length).toBeGreaterThan(0);
            storeSubscription();
        });
    })

    it('validated error on Cake Info list api call', () => {
        const store = configureStore();
        fetchMock.getOnce(BASE_URL, { status: 401, body: 'Error Response ' });
        store.dispatch(AppActions.processAction({ type: AppConstant.CAKE_INFO_LIST, data: [] }));
        let storeSubscription = store.subscribe((data) => {
            const state = store.getState();
            expect(state.cakeInfo.isError).toBe(true);
            storeSubscription();
        });
    })


    /**
     * Unit test to validate cake details data reset
     */
    it('clear cake details state', () => {
        const store = configureStore();
        const cakeDetails = {
            details: {
                id: '',
                yumFactor: 1,
                imageUrl: '',
                name: '',
                comment: ''
            },
          isError: false
        };
        store.dispatch(AppActions.processAction({ type: AppConstant.RESET_DETAILS_DATA, data: cakeDetails }));
        const storeSubscription= store.subscribe(() => {
            const state = store.getState();
            expect(state.cakeDetails.details.name).toBe('');
            storeSubscription();
        });
    })

    /**
     * Unit test for get cake info list api calls
     */
    it('get cake details', () => {
        const store = configureStore();
        fetchMock.getOnce(`${BASE_URL}/sdfdsfssreff45w23`, JSON.stringify(mockResponse[0]));
        store.dispatch(AppActions.processAction({ type: AppConstant.CAKE_DETAILS, data: 'sdfdsfssreff45w23' }));
        const storeSubscription = store.subscribe(() => {
            const state = store.getState();            
            expect(state.cakeDetails.details.name).toBe('My Cake');
            storeSubscription();
        });
    })

    it('Validate error on cake details api', () => {
        const store = configureStore();
        fetchMock.getOnce(`${BASE_URL}/sdfdsfreff45w23`, { status: 401, body: 'Error Response ' });
        store.dispatch(AppActions.processAction({ type: AppConstant.CAKE_DETAILS, data: 'sdfdsfreff45w23' }));
        const storeSubscription = store.subscribe(() => {
            const state = store.getState();            
            expect(state.cakeDetails.isError).toBe(true);
            storeSubscription();
        })
    })

    /**
     * Unit test to validate submit cake api call
     */
    it('submit cake details on submitCake api call', () => {
        const store = configureStore();
        fetchMock.postOnce(BASE_URL, JSON.stringify(mockResponse));
        store.dispatch(AppActions.processAction({ type: AppConstant.SUBMIT_CAKE, data: mockAddCakeFormData }));
        const storeSubscription = store.subscribe(() => {
            const state = store.getState();
            expect(state.cakeFormDetails.isError).toBe(false);
            expect(state.cakeFormDetails.details.name.value).toBe('My Cake');
            storeSubscription();
        })
    })

    it('Validate error on submit cake details api', () => {
        const store = configureStore();
        fetchMock.postOnce(BASE_URL, { status: 401, body: 'Error Response ' });
        store.dispatch(AppActions.processAction({ type: AppConstant.SUBMIT_CAKE, data: mockAddCakeFormData }));
        const storeSubscription = store.subscribe(() => {
            const state = store.getState();
            expect(state.cakeFormDetails.isError).toBe(true);
            storeSubscription();
        })
    })
})
