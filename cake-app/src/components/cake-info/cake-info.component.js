import React from 'react';
import {
  Link
} from 'react-router-dom';
import AppActions from '../../actions/app.actions.js';

/**
 * CakeInfoComponent - To show list of all cakes to users
 */
export default class CakeInfoComponent extends React.Component {

  /**
   * componentDidMount Lifecycle Hook
   */
  componentDidMount() {
   this.props.updateCakeList(AppActions.getCakeInfoAction(''));
  }

  /**
   * To render component templatet
   */
  render() {
    return (
            <div className="cake-info row">
              <div className="col-12 my-3 cake-details__btn">
                <Link to={`/add-cake`} className="btn btn-primary">
                  Add you cake!
                 </Link>
              </div>
              { this.props.cakeInfo.isError && this.props.cakeInfo.cakeInfoList.length === 0 ?
            <div className="col-md-12 text-danger my-5 text-center">Service Error, Please try later!</div> : this.renderCakeInfoList()}
            </div>
    )
  }

  /**
   * Render cake list as per server response
   */
  renderCakeInfoList() {
    return this.props.cakeInfo.cakeInfoList.map((cake, index) => {
      return cake.imageUrl ? <div className="col-md-3 no-gutters text-center p-0" key={index.toString()}>
        <div className="card m-2">
          <Link to={`/cake-detail/${cake.id}`}>
            <img alt="cake" src={ cake.imageUrl && cake.imageUrl.indexOf('http') > -1 ?  cake.imageUrl : 'http://demo.makitweb.com/broken_image/images/noimage.png'} className="card-img-top cake-info__grid" />
          </Link>
          <h5 className="card-title m-1">{cake.name}</h5>
        </div>
      </div> : '';
    });
  }
}
