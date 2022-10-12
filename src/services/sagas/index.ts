import { START_SORTING_ASCENDING, START_SORTING_DESCENDING } from './actions/sortingActions';
import { FIND_FIBONACCI } from './actions/fibonacci';
import { all, takeEvery } from 'redux-saga/effects';
import { REVERSE_STRING } from './actions/reverseStringActions';
import { reverseStringWorker } from './reverseStringSaga';
import { findFibonacciWorker } from './fibonacciSaga';
import { sortArrayAscendingWorker, sortArrayDescendingWorker } from './sortingSaga';

export function* rootSaga() {
  yield all([
     takeEvery(REVERSE_STRING, reverseStringWorker),
     takeEvery(FIND_FIBONACCI, findFibonacciWorker),
     takeEvery(START_SORTING_ASCENDING, sortArrayAscendingWorker),
     takeEvery(START_SORTING_DESCENDING, sortArrayDescendingWorker),
  ]);
}
