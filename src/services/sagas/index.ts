import { all, takeEvery } from 'redux-saga/effects';
import { REVERSE_STRING } from './actions/reverseStringActions';
import { reverseStringWorker } from './reverseStringSaga';

export function* rootSaga() {
  yield all([
     takeEvery(REVERSE_STRING, reverseStringWorker),
  ]);
}
