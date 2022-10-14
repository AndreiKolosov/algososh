import { ENQUEUE, DEQUEUE } from './actions/queueActions';
import { ADD_TO_STACK, REMOVE_FROM_STACK } from './actions/stackActions';
import { START_SORTING } from './actions/sortingActions';
import { FIND_FIBONACCI } from './actions/fibonacci';
import { all, takeEvery } from 'redux-saga/effects';
import { REVERSE_STRING } from './actions/reverseStringActions';
import { reverseStringWorker } from './reverseStringSaga';
import { findFibonacciWorker } from './fibonacciSaga';
import { sortingArrayWorker } from './sortingSaga';
import { addToStackWorker, removeFromStackWorker } from './stackSaga';
import { dequeueSageWorker, enqueueSageWorker } from './queueSaga';

export function* rootSaga() {
  yield all([
     takeEvery(REVERSE_STRING, reverseStringWorker),
     takeEvery(FIND_FIBONACCI, findFibonacciWorker),
     takeEvery(START_SORTING, sortingArrayWorker),
     takeEvery(ADD_TO_STACK, addToStackWorker),
     takeEvery(REMOVE_FROM_STACK, removeFromStackWorker),
     takeEvery(ENQUEUE, enqueueSageWorker),
     takeEvery(DEQUEUE, dequeueSageWorker),
  ]);
}
