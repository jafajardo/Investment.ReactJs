import { combineReducers } from 'redux';

import InvestmentReducer from './InvestmentReducer';
import LoanReducer from './LoanReducer';

export default combineReducers({
  investment: InvestmentReducer,
  loan: LoanReducer
})