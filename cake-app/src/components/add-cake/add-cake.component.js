import React from 'react';
import AppConstant from '../../constants/constants.js';

// Keep it here as tt is used only this file
const YUM_FACTORS = [1, 2, 3, 4, 5];

/**
 * AddCakeComponent - To submit cake from users
 */
export default class AddCakeComponent extends React.Component {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.yumFactors = YUM_FACTORS;
    }

    componentWillUnmount(){
        this.resetModels();
    }
    /**
     * To hadle changes of form elements
     * @param event - on click event 
     */
    handleOnChange(event) {
        if (event && event.target) {
            const value = event.target.value;
            const target = event.target.name;
            if (target === 'yumFactor') {
                this.props.cakeFormDetails.details[target] = value
            } else {
                this.props.cakeFormDetails.details[target].value = value;
                this.props.cakeFormDetails.details[target].isTouched = true;
                this.validate(target);
            }
            this.props.updateCakeList({ type: AppConstant.CAKE_FORM_DATA, data: this.props.cakeFormDetails });

        }
    }

    /**
     * To reset form values
     */
    resetModels() {
        this.props.cakeFormDetails.details = {
            yumFactor: 1,
            imageUrl: { value: '', isTouched: false },
            name: { value: '', isTouched: false },
            comment: { value: '', isTouched: false }
        };
        this.props.updateCakeList({ type: AppConstant.CAKE_FORM_DATA, data: this.props.cakeFormDetails });
    }

    /**
     * To submit cake
     */
    addCake() {
        if (this.validateCompleteForm()) {
           this.props.updateCakeList({ type: AppConstant.SUBMIT_CAKE, data: this.props.cakeFormDetails });
        }
    }

    /**
     * To updated error state of elements
     * @param target - node of state element to be validated
     */
    validate(target) {
        this.props.cakeFormDetails.details[target].isValid = this.props.cakeFormDetails.details[target].value.trim() !== '';
        this.props.updateCakeList({ type: AppConstant.CAKE_FORM_DATA, data: this.props.cakeFormDetails });
    }

    /**
     * To show validation error
     * @param element - name of state element to be validated
     */
    isValid(element) {
        return this.props.cakeFormDetails.details[element].isTouched ? this.props.cakeFormDetails.details[element].isValid : true;
    }

    /**
     * To validated complete form
     */
    validateCompleteForm() {
        return Object.keys(this.props.cakeFormDetails.details).every((v) => {
            return v !== 'yumFactor' ? this.props.cakeFormDetails.details[v].value !== '': true;
        });
    }


    /**
     * To render add cake form UI elements
     */
    render() {
        return (
            <div className="add-cake row border rounded p-3">
                {
                    this.props.cakeFormDetails.isCakeAdded ? <div className="alert alert-success col-md-12" role="alert">
                        You cake is added. Please check on cake list page!
                    </div> : ''
                }

                <h4 className="col-md-12">Add your cake</h4>
                <div className="col-md-12 my-2">
                    <b>Cake Name</b>
                    <input placeholder="Enter cake name here"
                        value={this.props.cakeFormDetails.details.name.value}
                        name="name"
                        onChange={(event) => { this.handleOnChange(event) }}
                        className="add-cake__comment col-md-12" />
                    {
                        this.isValid('name') ? '' : <div className="text-danger">Please enter name of cake</div>
                    }
                </div>
                <div className="col-md-12 my-2">
                    <b>Cake Image</b>
                    <input placeholder="Enter cake image url"
                        value={this.props.cakeFormDetails.details.imageUrl.value}
                        name="imageUrl"
                        onChange={(event) => { this.handleOnChange(event) }}
                        className="add-cake__comment col-md-12" />
                    {
                        this.isValid('imageUrl') ? '' : <div className="text-danger">Please enter your image</div>
                    }
                </div>
                <div className="col-md-12 my-2">
                    <b>Comment</b>
                    <input placeholder="Enter your comment here"
                        value={this.props.cakeFormDetails.details.comment.value}
                        name="comment"
                        onChange={(event) => { this.handleOnChange(event) }}
                        className="add-cake__comment col-md-12" />
                    {
                        this.isValid('comment') ? '' : <div className="text-danger">Please enter your comment</div>
                    }
                </div>
                <div className="col-md-12 my-2">
                    <b>Yum Factor</b>
                    <select placeholder="yum factor"
                        className="add-cake__comment col-md-12"
                        value={this.props.cakeFormDetails.details.yumFactor}
                        name="yumFactor"
                        onChange={(event) => { this.handleOnChange(event) }}>
                        {
                            this.yumFactors.map((value, index) => {
                                return <option key={value + index.toString()}>
                                    {value}
                                </option>
                            })
                        }
                    </select>
                </div>
                <div className="col-12 my-3 add-cake__btn">
                    <button className="btn btn-primary my-2 mr-2" onClick={() => { this.resetModels() }}>Reset</button>
                    <button className="btn btn-primary my-2 mr-2" onClick={() => { this.addCake() }}>Submit</button>
                    <button className="btn btn-primary my-2" onClick={() => { window.history.back() }}>Go Back</button>
                    {
                        this.props.cakeFormDetails.isError ? <div className="text-danger">
                            Service Error, cake info is not submitted. Please try again
                   </div> : ''
                    }
                </div>
            </div>
        );
    }
}
