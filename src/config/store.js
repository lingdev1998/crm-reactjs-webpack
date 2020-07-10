import { reducer as reduxFormReducer } from 'redux-form';
import {  
  customizerReducer,
  rtlReducer,
} from '../redux/reducers/index';

import { createStore, applyMiddleware,  combineReducers } from 'redux'; 
const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form", 
  rtl: rtlReducer, 
  customizer: customizerReducer,
});


const initialize = () => 
  createStore(reducer);

export default initialize;

