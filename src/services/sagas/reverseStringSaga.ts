import { ElementStates } from './../../types/element-states';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, put, select } from 'redux-saga/effects';
import { setNewElementStatus, setSortedArr, setSortingStatus, setStringArr } from '../slices/reverseStringSlice';
import { TChar, TParams } from '../../types/stringReverse.types.';
import { getArr, swap } from './sagasHelpers/stringSagaHelpers';



export function* reverseStringWorker(params: TParams) {
  yield put(setSortingStatus(true))
  yield put(setStringArr(params.stringChars));
  yield delay(SHORT_DELAY_IN_MS)
  const currentCharsArr : TChar[] = yield select(getArr);
  let arr = [...currentCharsArr];

  if (arr.length === 1) {
    yield put(setNewElementStatus({ index: 0, status: ElementStates.Modified }));
  }

  if (arr.length > 1) {
    let start = 0;
    let end = arr.length - 1;
    const middle = Math.round(end / 2);
    while (start < middle) {
      yield put(setNewElementStatus({ index: start, status: ElementStates.Changing }));
      yield put(setNewElementStatus({ index: end, status: ElementStates.Changing }));
      yield swap(arr, start, end);
      yield put(setSortedArr(arr));
      yield put(setNewElementStatus({ index: start, status: ElementStates.Modified }));
      yield put(setNewElementStatus({ index: end, status: ElementStates.Modified }));
      const currentArr: TChar[] = yield select(getArr);
      arr = [...currentArr];
      start++;
      end--;
    }
    if(start === middle) {
      yield delay(DELAY_IN_MS)
      yield put(setNewElementStatus({ index: middle, status: ElementStates.Modified }));
    }
  }

  yield put(setSortingStatus(false));
}

