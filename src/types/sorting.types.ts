// export type TParams = { stringChars: string[]; type: string };

import { ElementStates } from './element-states';

export type TArrayElement = {
  value: number;
  state: ElementStates;
};
// ===================================s
export type TArrElement = {
  value: number;
  status: ElementStates;
};

export enum SortMethods {
  SelectionSort = 'selectionSort',
  BubbleSort = 'bubbleSort'
}

export enum SortDirection {
  Descending = 'descending',
  Ascending = 'ascending',
}

export interface IInitialState {
  sortDirection: SortDirection;
  sortMethod: SortMethods;
  arrForSort: TArrElement[];
  inProcess: boolean;
}
