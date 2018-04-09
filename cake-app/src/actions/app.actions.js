import AppConstants from '../constants/constants.js';
import AppActionUtil from './action.util.js';

export default class AppActions {
    static processAction(action, dispatch) {
        switch (action.type) {

            case AppConstants.CAKE_INFO_LIST: 
                 AppActionUtil.cakeInfoAction(dispatch);
                 break;
            case AppConstants.CAKE_FORM_DATA:
                 AppActionUtil.updateFormData(dispatch, action.data);
                 break;
            case AppConstants.SUBMIT_CAKE:
                 AppActionUtil.submitCakeAction(dispatch, action.data);
                 break;
            case AppConstants.CAKE_DETAILS:
                 AppActionUtil.getCakeDetails(dispatch, action.data);
                 break;
            case AppConstants.RESET_DETAILS_DATA:
                 AppActionUtil.clearCakeDetailsData(dispatch, action.data);
                 break;
            default: 
                 break;
        }
    }
}
