import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, put, select } from 'redux-saga/effects';
import { RootState } from '../store/store';
import { setNewElementStatus, setSortedArr, setSortingStatus, setStringArr, TChar } from '../slices/stringSlice';

type TParams = { stringChars: string[]; type: string };

const getArr = (store: RootState) => store.string.stringArr;

function* swap(array: TChar[], i: number, j: number) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  yield delay(DELAY_IN_MS);
}

export function* sortStringWorker(params: TParams) {
  yield put(setSortingStatus(true))
  yield put(setStringArr(params.stringChars));
  yield delay(SHORT_DELAY_IN_MS)
  const currentCharsArr : TChar[] = yield select(getArr);
  let arr = [...currentCharsArr];

  if (arr.length === 1) {
    yield put(setNewElementStatus({ index: 0, status: 'Modified' }));
  }

  if (arr.length > 1) {
    let start = 0;
    let end = arr.length - 1;
    const middle = Math.round(end / 2);
    while (start < middle) {
      yield put(setNewElementStatus({ index: start, status: 'Changing' }));
      yield put(setNewElementStatus({ index: end, status: 'Changing' }));
      yield swap(arr, start, end);
      yield put(setSortedArr(arr));
      yield put(setNewElementStatus({ index: start, status: 'Modified' }));
      yield put(setNewElementStatus({ index: end, status: 'Modified' }));
      const currentArr: TChar[] = yield select(getArr);
      arr = [...currentArr];
      start++;
      end--;
      console.log(arr, start, end);
    }
    if(start === middle) {
      yield delay(DELAY_IN_MS)
      yield put(setNewElementStatus({ index: middle, status: 'Modified' }));
    }
  }

  yield put(setSortingStatus(false));
}

