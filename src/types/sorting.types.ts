import { ElementStates } from './element-states';

export type TArrayElement = {
  value: number;
  state: ElementStates;
};

export enum SortMethods {
  SelectionSort = 'selectionSort',
  BubbleSort = 'bubbleSort'
}

export enum SortDirection {
  Descending = 'descending',
  Ascending = 'ascending',
}
