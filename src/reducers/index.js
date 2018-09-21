import { combineReducers } from 'redux';

import InvestmentReducer from './InvestmentReducer';

export default combineReducers({
  investment: InvestmentReducer
})