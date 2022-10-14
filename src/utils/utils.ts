import { ElementStates } from '../types/element-states';

export const defaultQueueItem = {
  value: '',
  index: 0,
  head: false,
  tail: false,
  state: ElementStates.Default,
};

export const createQueue = (size: number) => {
  const arr = [];
  let i = 0;

  while (i < size) {
    arr.push(defaultQueueItem);
    i += 1;
  }
  return arr;
}