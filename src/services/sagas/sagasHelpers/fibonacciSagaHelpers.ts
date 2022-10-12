import { put, delay } from 'redux-saga/effects';
import { SHORT_DELAY_IN_MS } from '../../../constants/delays';
import { RootState } from '../../../types';
import { pushNumber } from '../../slices/fibonacciSlice';

export function* findFibonacci(n: number) {
  let prev = 1;
  let next = 1;
  for (let i = 0; i < n; i++) {
    yield put(pushNumber(prev));
    yield delay(SHORT_DELAY_IN_MS);

    let temp = next;
    next = prev + next;
    prev = temp;
  }
  yield put(pushNumber(prev));
}

// Selectors________________________________________
export const getNumber = (store: RootState) => store.fibonacci.number;


