import { ElementStates } from './element-states';

export type TQueueElement = {
  value: string;
  state: ElementStates;
};

export type TProcess = { isAdding: boolean; isRemoving: boolean };

export type TQueueSagaParams = { value: string; type: string };

export type TQueueItem = {
  value: string;
  index: number;
  head: boolean;
  tail: boolean;
  state: ElementStates;
};

export interface IInitialState {
  queue: TQueueItem[];
  queueHead: number;
  queueTail: number;
  queueLength: number;
  queueSize: number;
  inProcess: boolean;
}
