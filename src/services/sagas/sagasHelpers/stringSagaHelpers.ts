import { delay } from 'redux-saga/effects';
import { DELAY_IN_MS } from '../../../constants/delays';
import { TChar } from '../../../types/stringReverse';
import { RootState } from '../../store/store';

export function* swap(array: TChar[], i: number, j: number) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  yield delay(DELAY_IN_MS);
}

// Selectors________________________________________
export const getArr = (store: RootState) => store.string.stringArr;