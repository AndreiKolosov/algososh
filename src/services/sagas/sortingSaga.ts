import { put, delay } from 'redux-saga/effects';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { SortDirection } from '../../types/sorting.types';
import { setSortDirection, setSortingStatus } from '../slices/sortingSlice';

export function* sortArrayDescendingWorker(params: any) {
  yield put(setSortingStatus(true));
  yield put(setSortDirection(SortDirection.Descending))
  yield delay(SHORT_DELAY_IN_MS);
  yield console.log('Hello from sorting DESC worker');
  yield put(setSortingStatus(false));
}

export function* sortArrayAscendingWorker(params: any) {
  yield put(setSortingStatus(true));
  yield put(setSortDirection(SortDirection.Ascending));
  yield delay(SHORT_DELAY_IN_MS);
  yield console.log('Hello from sorting ASC worker');
  yield put(setSortingStatus(false));
}