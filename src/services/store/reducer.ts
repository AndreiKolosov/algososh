import { combineReducers } from 'redux';
import { fibonacciSlice } from '../slices/fibonacciSlice';
import { reverseStringSlice } from '../slices/reverseStringSlice';

export const rootReducer = combineReducers({
  string: reverseStringSlice.reducer,
  fibonacci: fibonacciSlice.reducer
});
