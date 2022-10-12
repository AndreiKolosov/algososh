import { FIND_FIBONACCI } from './actions/fibonacci';
import { all, takeEvery } from 'redux-saga/effects';
import { REVERSE_STRING } from './actions/reverseStringActions';
import { reverseStringWorker } from './reverseStringSaga';
import { findFibonacciWorker } from './fibonacciSaga';

export function* rootSaga() {
  yield all([
     takeEvery(REVERSE_STRING, reverseStringWorker),
     takeEvery(FIND_FIBONACCI, findFibonacciWorker)
  ]);
}
