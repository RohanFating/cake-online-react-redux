import AppConstants from '../constants/constants.js';
import cakeService from '../services/cake.service.js';
const SUCCESS_ALERT_TIME = 2000;

/**
 * Utility class for app.actions to dispatch respective events
 */
export default class AppActionUtil {

    /**
     * To save cake info list coming from service
     */
    static cakeInfoAction(dispatch) {
        cakeService.getCakeList().then((data) => {
            dispatch({ type: AppConstants.CAKE_INFO_LIST, data: data });
        })
            .catch((error) => {
                dispatch({ type: AppConstants.CAKE_INFO_LIST_SERVICE_ERROR, data: [] });
            });
    }

    /**
     * To save cake details info coming from service
     */
    static getCakeDetails(dispatch, id) {
        cakeService.getCakeDetailsById(id).then((data) => {
            dispatch({ type: AppConstants.CAKE_DETAILS, data: data });
        })
            .catch((error) => {
                dispatch({ type: AppConstants.CAKE_DETAILS_ERROR, data: {} });
            });
    }

    /**
     * To clear cake details info
     */
    static clearCakeDetailsData(dispatch, data) {
        dispatch({ type: AppConstants.RESET_DETAILS_DATA, data: data });
    }

    /**
     * To update add cake form data
     */
    static updateFormData(dispatch, formData) {
        formData.isError = false;
        dispatch({ type: AppConstants.CAKE_FORM_DATA, data: formData });
    }

    /**
     * To submit cake from user
     */
    static submitCakeAction(dispatch, cakeDetail) {
        cakeService.submitCake(AppActionUtil.createSubmitCakePayload(cakeDetail)).then((data) => {
            cakeDetail.isCakeAdded = true;
            dispatch({ type: AppConstants.CAKE_SUBMITTED, data: cakeDetail });
            setTimeout(() => {
                cakeDetail.isCakeAdded = false;
                dispatch({ type: AppConstants.CAKE_SUBMITTED, data: cakeDetail });
            }, SUCCESS_ALERT_TIME)
        })
            .catch((error) => {
                cakeDetail.isError = true;
                dispatch({ type: AppConstants.SUBMIT_CAKE_SERVICE_ERROR, data: cakeDetail });
            });
    }

    /**
     * To create post payload
     */
    static createSubmitCakePayload(cakeDetails) {
        return {
            comment: cakeDetails.details.comment.value,
            imageUrl: cakeDetails.details.imageUrl.value,
            name: cakeDetails.details.name.value,
            yumFactor: cakeDetails.details.yumFactor
        };
    }
}