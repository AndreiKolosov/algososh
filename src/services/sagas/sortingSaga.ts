import { ElementStates } from './../../types/element-states';
import { SortMethods } from './../../types/sorting.types';
import { getSortDirection, getSortMethod, getArrForSort } from './sagasHelpers/sortingSagaHelpers';
import { put, delay, select } from 'redux-saga/effects';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { SortDirection, TArrElement } from '../../types/sorting.types';
import { resetElementsStatuses, setNewArr, setNewItemStatus, setSortDirection, setSortingStatus } from '../slices/sortingSlice';

export function swap(arr: TArrElement[], firstIndex: number, secondIndex: number): void {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export function* selectionSort(array: TArrElement[], direction: SortDirection) {
  let arr = [...array];
  const { length } = arr;

  for (let i = 0; i < length; i++) {
    let minInd = i;
    yield put(setNewItemStatus({ index: minInd, status: ElementStates.Changing }));
    for (let j = i + 1; j < length; j++) {
      yield put(setNewItemStatus({ index: j, status: ElementStates.Changing }));
      yield delay(SHORT_DELAY_IN_MS);

      if (
        (direction === SortDirection.Ascending && arr[j].value < arr[minInd].value) ||
        (direction === SortDirection.Descending && arr[j].value > arr[minInd].value)
      ) {
        minInd = j;
        yield put(setNewItemStatus({ index: j, status: ElementStates.Changing }));
        yield put(setNewItemStatus({ index: j, status: i === minInd ? ElementStates.Changing : ElementStates.Default }));
      }
      if (j !== minInd) yield put(setNewItemStatus({ index: j, status: ElementStates.Default }));

    }
    if (minInd !== i) {
      swap(arr, minInd, i);
    }
    yield put(setNewArr(arr));
    yield put(setNewItemStatus({ index: minInd, status: ElementStates.Default }));
    yield put(setNewItemStatus({ index: i, status: ElementStates.Modified }));
    const currentArr: TArrElement[] = yield select(getArrForSort);
    arr = [...currentArr];
  }
};

export function* bubbleSort(array: TArrElement[], direction: SortDirection) {
  let arr = [...array];
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {

      yield put(setNewArr(arr));
      yield put(setNewItemStatus({index: j, status: ElementStates.Changing}))
      if (arr[j + 1]) yield put(setNewItemStatus({ index: j + 1, status: ElementStates.Changing }));
      const currentArr: TArrElement[] = yield select(getArrForSort);
      arr = [...currentArr]

      yield delay(SHORT_DELAY_IN_MS)

      if (
        (direction === SortDirection.Ascending && arr[j].value > arr[j + 1]?.value) ||
        (direction === SortDirection.Descending && arr[j].value < arr[j + 1]?.value)
      ) {
        swap(arr, j + 1, j);
        
      }

      yield put(setNewArr(arr));
      yield put(setNewItemStatus({ index: j, status: ElementStates.Default }));
      if (arr[j + 1]) yield put(setNewItemStatus({ index: j + 1, status: ElementStates.Default }));
      const currentArray: TArrElement[] = yield select(getArrForSort);
      arr = [...currentArray];

    }

    yield put(setNewArr(arr));
    yield put(setNewItemStatus({ index: array.length - i - 1, status: ElementStates.Modified }));
    const currentArr: TArrElement[] = yield select(getArrForSort);
    arr = [...currentArr];

  }
}; 


export function* sortArrayDescendingWorker() {
  yield put(setSortingStatus(true));
  yield put(resetElementsStatuses());
  yield put(setSortDirection(SortDirection.Descending))
  const direction: SortDirection = yield select(getSortDirection);
  const method: SortMethods = yield select(getSortMethod);
  const arr: TArrElement[] = yield select(getArrForSort);
  const temp = [...arr]
  if (method === SortMethods.BubbleSort) {
    yield bubbleSort(temp, direction)
  }

  if (method === SortMethods.SelectionSort) {
    yield selectionSort(temp, direction)
  }
  yield put(setSortingStatus(false));
}

export function* sortArrayAscendingWorker() {
  yield put(setSortingStatus(true));
  yield put(resetElementsStatuses());
  yield put(setSortDirection(SortDirection.Ascending));
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