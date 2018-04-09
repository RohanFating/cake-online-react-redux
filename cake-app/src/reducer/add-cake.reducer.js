import AppConstant from '../constants/constants.js';

const initialState = {
    details: {
        name: {
            value: '',
            isValid: false,
            isTouched: false
        },
        comment: {
            value: '',
            isValid: false,
            isTouched: false
        },
        imageUrl: {
            value: '',
            isValid: false,
            isTouched: false
        },
        yumFactor: 1
    },
    isCakeAdded: false,
    isError: false
}

/**
 * To handle state of Add Cake Component
 * @param state - maintain state of add cake component
 * @param action - action to perform state operation
 */
export default function AddCakeReducer( state=initialState, action ) {
    switch(action.type) {
        case AppConstant.CAKE_FORM_DATA: 
        case AppConstant.CAKE_SUBMITTED: 
                return Object.assign({}, state, action.data);
        case AppConstant.SUBMIT_CAKE_SERVICE_ERROR: 
                return Object.assign({}, state, action.data);
        default : return state;
    }
}