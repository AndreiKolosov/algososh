import { ElementStates } from '../../types/element-states';
import { TInProcess, TListElement } from '../../types/linkedList.types';

export const createInitialElements = (min: number, max: number): TListElement[] => {
  const randomLen = Math.floor(Math.random() * (max - min)) + min;
  const randomNumArray = Array.from({ length: randomLen }, () => Math.floor(Math.random() * 100));
  const randomArray = randomNumArray.map((el: number) => ({
    value: String(el),
    state: ElementStates.Default,
    head: '',
    tail: '',
    extraClass: true,
  }));
  randomArray[randomArray.length - 1].extraClass = false;
  randomArray[randomArray.length - 1].tail = 'tail';
  randomArray[0].head = 'head';

  return randomArray;
};

export const setDefaultElementStates = (arr: TListElement[]) => {
  arr.map((el) => (el.state = ElementStates.Default));
};

export const defaultProcessStat: TInProcess = {
  isAddingToTail: false,
  isAddingToHead: false,
  isAddingByIndex: false,
  isRemovingFormTail: false,
  isRemovingFormHead: false,
  isRemovingByIndex: false,
};
