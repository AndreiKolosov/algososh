import { ReactElement } from 'react';
import { ElementStates } from './element-states';

export type TListElement = {
  value: string;
  state: ElementStates;
  head: string | ReactElement;
  tail: string | ReactElement;
  extraClass: boolean;
};

export type TInProcess = {
  isAddingToTail: boolean;
  isAddingToHead: boolean;
  isAddingByIndex: boolean;
  isRemovingFormTail: boolean;
  isRemovingFormHead: boolean;
  isRemovingByIndex: boolean;
};