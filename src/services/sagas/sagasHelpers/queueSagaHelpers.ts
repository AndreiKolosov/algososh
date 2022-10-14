import { RootState } from './../../../types/index';
// Selectors________________________________________
export const getHead = (store: RootState) => store.queue.queueHead;
export const getTail = (store: RootState) => store.queue.queueTail;
export const getLength = (store: RootState) => store.queue.queueLength;
export const getSize = (store: RootState) => store.queue.queueSize;

