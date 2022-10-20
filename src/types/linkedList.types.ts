import { LinkedListNode } from '../components/list-page/linked-list';
import { Dispatch, ReactElement, SetStateAction } from 'react';
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

export type TValueControlProps = {
  extraClass?: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  processState: TInProcess;
  isEmpty: boolean;
  disabledAdd: boolean;
  handlers: {
    handleAddToHead: () => void;
    handleAddToTail: () => void;
    handleRemoveFromHead: () => void;
    handleRemoveFromTail: () => void;
  };
};

export type TIndexControlProps = {
  extraClass?: string;
  setValue: Dispatch<SetStateAction<string>>;
  index: string;
  processState: TInProcess;
  isAddDisabled: boolean;
  handlers: {
    handleAddByIndex: () => void;
    handleRemoveByIndex: () => void;
  };
};

export interface ILinkedList<T> {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getValues: () => T[];
  getSize: () => number;
  getHead: () => LinkedListNode<T> | null;
}