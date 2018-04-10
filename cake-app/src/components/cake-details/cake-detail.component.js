import React from 'react';
import AppActions from '../../actions/app.actions.js';
/**
 * CakeDetailComponent - To show details of cake
 */
export default class CakeDetailComponent extends React.Component {

    /**
     * componentDidMount Lifecycle Hook
     */
    componentDidMount() {
        this.props.updateCakeList(AppActions.getCakeDetailsAction(this.props.match.match.params.id));
    }

    /**
     * componentWillUnmount Lifecycle Hook - to clean up component
     */
    componentWillUnmount(){
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
        this.props.updateCakeList(AppActions.resetCakeDetailsAction(cakeDetails));
    }
    /**
     * To render cake details screen
     */
    render() {
        return (
            <div className="cake-details">
                {
                    this.props.cakeDetails.isError 
                        ?
                       <div className="col-md-12 text-danger my-5 text-center">Service Error, Please try later!</div>
                        :
                        <div className="row">
                            <div className="col-6">
                                <img alt="cake" src={this.props.cakeDetails.details.imageUrl && this.props.cakeDetails.details.imageUrl.indexOf('http') > -1 ? this.props.cakeDetails.details.imageUrl : 'http://demo.makitweb.com/broken_image/images/noimage.png'} className="card-img-top border rounded cake-details__grid" />
                            </div>
                            <div className="col-6 ng-gutters">
                                <div className="col-12">
                                    <h4>{this.props.cakeDetails.details.name}</h4>
                                </div>
                                <div className="col-12">
                                    <div className="my-2">
                                        <b>Yum Factor: </b>{this.props.cakeDetails.details.yumFactor}</div>
                                    <div className="my-2">
                                        <b>Comments: </b>{this.props.cakeDetails.details.comment || 'No Comments Available'}</div>
                                </div>
                                <div className="col-12 my-5">
                                    <button className="btn btn-primary" onClick={() => { window.history.back() }}>Go Back</button>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
