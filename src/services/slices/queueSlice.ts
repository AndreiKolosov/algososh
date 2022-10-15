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
    initQueue(store, action: PayloadAction<{ queue: TQueueItem[]; size: number }>) {
      store.queue = Array(action.payload.size);
      store.queue = [...action.payload.queue];
      store.queueSize = action.payload.size;
    },
    enqueue(store, action: PayloadAction<string>) {
      if (store.queueTail >= store.queueSize) return;
      if (store.queueHead !== store.queueTail) store.queue[store.queueTail - 1].tail = false;

      store.queue[store.queueTail] = {
        value: action.payload,
        index: store.queueTail,
        head: store.queueHead === store.queueTail || false,
        tail: true,
        state: ElementStates.Changing
      }
      store.queueTail += 1;
      store.queueLength += 1;
    },
    dequeue(store) {
      if (store.queueLength === 0) return;
      
      store.queue[store.queueHead] = defaultQueueItem;
      if (store.queueHead !== store.queueTail - 1) store.queue[store.queueHead + 1].head = true;
      store.queueHead += 1;
      store.queueLength--;
        
    },
    clearQueue(store) {
      store.queue = initialState.queue;
      store.queueHead = initialState.queueHead;
      store.queueLength = initialState.queueLength;
      store.queueSize = initialState.queueSize;
      store.queueTail = initialState.queueTail;
      store.inProcess = initialState.inProcess;
    },
    setInProcess(store, action: PayloadAction<boolean>) {
      store.inProcess = action.payload;
    },

    setItemStateToDefault(store, action: PayloadAction<number>) {
      store.queue[action.payload].state = ElementStates.Default;
    },
    setItemStateToChanging(store, action: PayloadAction<number>) {
      store.queue[action.payload].state = ElementStates.Changing;
    },
  },
});

export const {
  initQueue,
  clearQueue,
  enqueue,
  dequeue,
  setInProcess,
  setItemStateToChanging,
  setItemStateToDefault,
} = queueSlice.actions;
