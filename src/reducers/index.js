import { combineReducers } from 'redux';

// import reducers
import {
  currencyReducer,
} from './currency';

// combine reducers
const rootReducers = combineReducers({
  currencyReducer,
});

export default rootReducers;
