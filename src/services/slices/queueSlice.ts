import { defaultQueueItem } from './../../utils/utils';
import { ElementStates } from './../../types/element-states';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, TQueueItem } from '../../types/queue.types';

const initialState: IInitialState = {
  queue: [],
  queueHead: 0,
  queueTail: 0,
  queueLength: 0,
  queueSize: 0,
  inProcess: false,
};

export const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    initQueue(store, action: PayloadAction<{ queue: TQueueItem[], size: number }>) {
      store.queue = Array(action.payload.size)
      store.queue = [...action.payload.queue]
      store.queueSize = action.payload.size
    },
    enqueue(store, action: PayloadAction<TQueueItem>) {
      if (store.queueLength >= store.queueSize) {
        throw new Error('Maximum length exceeded');
      }
      if (store.queueTail >= store.queueSize) {
        store.queueTail = 0;
      }
      if (store.queueHead >= store.queueSize) {
        store.queueHead = 0;
      }
      store.queue[store.queueTail] = action.payload;
      store.queueTail += 1;
      store.queueLength += 1;
    },
    dequeue(store) {
      if (store.queueLength === 0) {
        throw new Error('No elements in the queue');
      }
      if (store.queueTail >= store.queueSize) {
        store.queueTail = 0;
      }
      if (store.queueHead >= store.queueSize) {
        store.queueHead = 0;
      }
      store.queue[store.queueHead] = defaultQueueItem;
      store.queueHead += 1;
      store.queueLength--;
    },
    clearQueue(store, action: PayloadAction<{ queue: TQueueItem[], size: number }>) {
      store.queue = Array(action.payload.size);
      store.queue = [...action.payload.queue];
      store.queueSize = action.payload.size
      store.queueLength = 0;
      store.queueHead = 0;
      store.queueTail = 0;
    },
  },
});

export const { initQueue, enqueue, dequeue } = queueSlice.actions;
