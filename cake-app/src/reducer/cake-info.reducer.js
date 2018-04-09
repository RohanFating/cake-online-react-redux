import AppConstant from '../constants/constants.js';

const initialState = {
    cakeInfoList: [],
    isError: false
}

/**
 * To handle state of Cake Info Component
 * @param state - maintain state of cake info component
 * @param action - action to perform state operation
 */
export default function CakeInfoReducer( state=initialState, action ) {
    switch(action.type) {
        case AppConstant.CAKE_INFO_LIST : return Object.assign({}, state, { cakeInfoList : action.data, isError: false });
        case AppConstant.CAKE_INFO_LIST_SERVICE_ERROR :  return Object.assign({}, state, { cakeInfoList : action.data, isError: true  });
        default : return state;
    }
}
