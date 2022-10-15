import { ElementStates } from './element-states';

export type TListItem = {
  value: string;
  index: number;
  state: ElementStates;
  extraClass: boolean;
  extraClassModifier: ElementStates;
  head: string;
  tail: boolean;
};

export interface IInitialState {
  linkedList: TListItem[];
  listHead: number;
  listTail: number;
  listLength: number;
  inProcess: boolean;
}