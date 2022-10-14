import { put } from 'redux-saga/effects';
import { dequeue, enqueue } from '../slices/queueSlice';
import { TQueueSagaParams } from './../../types/queue.types';

export function* enqueueSageWorker(params: TQueueSagaParams) {
  yield console.log('hello')
  yield put(enqueue(params.item))
}

export function* dequeueSageWorker() {
  yield console.log('hello again');
  yield put(dequeue())
}