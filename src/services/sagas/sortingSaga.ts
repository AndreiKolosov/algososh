import { SortMethods } from './../../types/sorting.types';
import { getSortDirection, getSortMethod, getArrForSort, bubbleSort, selectionSort } from './sagasHelpers/sortingSagaHelpers';
import { put, select } from 'redux-saga/effects';
import { SortDirection, TArrElement } from '../../types/sorting.types';
import { resetElementsStatuses, setSortingStatus } from '../slices/sortingSlice';

export function* sortingArrayWorker() {
  yield put(setSortingStatus(true));
  yield put(resetElementsStatuses());
  const direction: SortDirection = yield select(getSortDirection);
  const method: SortMethods = yield select(getSortMethod);
  const arr: TArrElement[] = yield select(getArrForSort);
  const temp = [...arr];
  if (method === SortMethods.BubbleSort) {
    yield bubbleSort(temp, direction);
  }
  if (method === SortMethods.SelectionSort) {
    yield selectionSort(temp, direction);
  }
  yield put(setSortingStatus(false));
}