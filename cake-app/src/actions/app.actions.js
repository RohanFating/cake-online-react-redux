import AppConstants from '../constants/constants.js';
import AppActionUtil from './action.util.js';

/**
 * AppActions class - to handle all event dispatch to reducer
 */
export default class AppActions {

    static processAction(action) {
        switch (action.type) {

            case AppConstants.CAKE_INFO_LIST: 
                 return AppActionUtil.getCakeInfo(action.data);
            case AppConstants.CAKE_FORM_DATA:
                 return AppActionUtil.updateFormData(action.data);
            case AppConstants.SUBMIT_CAKE:
                 return AppActionUtil.submitCakeAction( action.data);
            case AppConstants.CAKE_DETAILS:
                 return AppActionUtil.getCakeDetails(action.data);
            case AppConstants.RESET_DETAILS_DATA:
                 return AppActionUtil.clearCakeDetailsData(action.data);
            default: 
                 break;
        }
    }

    static getCakeInfoAction(data) {
        return {
            type: AppConstants.CAKE_INFO_LIST,
            data: data
        };
    }
    static getCakeDetailsAction(data) {
        return {
            type: AppConstants.CAKE_DETAILS,
            data: data
        };
    }
    static updateFormDetailsAction(data) {
        return AppActionUtil.updateFormData({
            type: AppConstants.CAKE_FORM_DATA,
            data: data
        });
    }
    static submitCakeDetailsAction(data) {
        return {
            type: AppConstants.SUBMIT_CAKE,
            data: data
        };
    }
    static resetCakeDetailsAction(data) {
        return {
            type: AppConstants.RESET_DETAILS_DATA,
            data: data
        };
    }
    
}
