import { combineReducers } from 'redux';
import { stringSlice } from '../slices/stringSlice';

export const rootReducer = combineReducers({
  string: stringSlice.reducer,
});
