import AppConstant from '../constants/constants.js';

const initialState = {
    details: {
        id: '',
        name: '',
        comment: '',
        imageUrl: '',
        yumFactor: 1
    
    },
    isError: false
}

/**
 * To handle state of Cake Info Component
 * @param state - maintain state of cake info component
 * @param action - action to perform state operation
 */
export default function CakeDetailReducer( state=initialState, action ) {
    switch(action.type) {
        case AppConstant.CAKE_DETAILS:  return Object.assign({}, state, { details : action.data, isError: false });
        case AppConstant.CAKE_DETAILS_ERROR: 
                  initialState.isError = true;
                  return Object.assign({}, state, initialState );
        case AppConstant.RESET_DETAILS_DATA: return Object.assign({}, state, action.data );
        default : return state;
    }
}
