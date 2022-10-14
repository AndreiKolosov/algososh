import { SHORT_DELAY_IN_MS } from './../../constants/delays';
import { put, select, delay } from 'redux-saga/effects';
import { dequeue, enqueue, setInProcess, setItemStateToChanging, setItemStateToDefault } from '../slices/queueSlice';
import { TQueueSagaParams } from './../../types/queue.types';
import { getHead, getSize, getTail } from './sagasHelpers/queueSagaHelpers';

export function* enqueueSageWorker(params: TQueueSagaParams) {
  yield put(setInProcess(true));
  // const tail: number = yield select(getTail);
  // const size: number = yield select(getSize);
  // yield put(setItemStateToChanging(tail))
  // yield delay(SHORT_DELAY_IN_MS)
  yield put(enqueue(params.item));
  // yield delay(SHORT_DELAY_IN_MS);
  // yield put(setItemStateToDefault(tail))
  yield put(setInProcess(false));
}

export function* dequeueSageWorker() {
  yield put(setInProcess(true));
  // const head: number = yield select(getHead);
  // yield put(setItemStateToChanging(head))
  // yield delay(SHORT_DELAY_IN_MS)
  yield put(dequeue())
  yield put(setInProcess(false));
}