import { combineReducers } from 'redux';
import CakeInfoReducer from './reducer/cake-info.reducer.js';
import AddCakeReducer from './reducer/add-cake.reducer.js';
import CakeDetailsReducer from './reducer/cake-detail.reducer.js';

const rootReducer = combineReducers({
  cakeInfo: CakeInfoReducer,
  cakeFormDetails: AddCakeReducer,
  cakeDetails: CakeDetailsReducer
});

export default rootReducer;