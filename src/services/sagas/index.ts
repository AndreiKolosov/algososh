import { all, takeEvery } from 'redux-saga/effects';
import { sortStringWorker } from './stringSaga';

export function* rootSaga() {
  yield all([
     takeEvery('SORT_STRING', sortStringWorker),
  ]);
}
