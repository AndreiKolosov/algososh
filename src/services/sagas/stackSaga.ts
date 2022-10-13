import { put, delay } from 'redux-saga/effects';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { pop, push, setInProcess, setItemStateToChanging, setItemStateToDefault } from '../slices/stackSlice';
import { TStackSagaParams } from './../../types/stack.types';

export function* addToStackWorker(params: TStackSagaParams) {
  yield put(setInProcess(true));
  yield put(push(params.value));
  yield delay(SHORT_DELAY_IN_MS);
  yield put(setItemStateToDefault());
  yield put(setInProcess(false));
}

export function* removeFromStackWorker() {
  yield put(setInProcess(true));
  yield put(setItemStateToChanging());
  yield delay(SHORT_DELAY_IN_MS);
  yield put(pop());
  yield put(setInProcess(false));
}