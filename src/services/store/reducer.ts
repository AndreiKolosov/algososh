import { linkedListSlice } from './../slices/linkedListSlice';
import { stackSlice } from './../slices/stackSlice';
import { sortingSlice } from './../slices/sortingSlice';
import { combineReducers } from 'redux';
import { fibonacciSlice } from '../slices/fibonacciSlice';
import { reverseStringSlice } from '../slices/reverseStringSlice';
import { queueSlice } from '../slices/queueSlice';

export const rootReducer = combineReducers({
  string: reverseStringSlice.reducer,
  fibonacci: fibonacciSlice.reducer,
  sorting: sortingSlice.reducer,
  stack: stackSlice.reducer,
  queue: queueSlice.reducer,
  linkedList: linkedListSlice.reducer,
});
