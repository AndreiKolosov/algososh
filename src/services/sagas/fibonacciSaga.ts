import { SHORT_DELAY_IN_MS } from './../../constants/delays';
import { put, select, delay } from 'redux-saga/effects';
import { clearArr, clearNumber, setCountingStatus } from '../slices/fibonacciSlice';
import { findFibonacci, getNumber } from './sagasHelpers/fibonacciSagaHelpers';

export function* findFibonacciWorker() {
  yield put(clearArr());
  yield put(setCountingStatus(true));
  const num: number = yield select(getNumber)
  yield delay(SHORT_DELAY_IN_MS)
  yield findFibonacci(num);
  yield put(clearNumber());
  yield put(setCountingStatus(false));
}
