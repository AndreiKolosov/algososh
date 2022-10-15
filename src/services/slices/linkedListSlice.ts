import { ElementStates } from './../../types/element-states';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/linkedList.types';
// Вынести в Utils----------------
const createInitialListItem = (currentState: IInitialState, value: string) => ({
  value,
  index: currentState.listTail,
  head: currentState.listHead === currentState.listTail ? 'head' : '',
  tail: true,
  state: ElementStates.Default,
  extraClass: true,
  extraClassModifier: ElementStates.Default,
});
// -----------------------------------
const initialState: IInitialState = {
  linkedList: [],
  listHead: 0,
  listTail: 0,
  listLength: 0,
  inProcess: false,
};

export const linkedListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    initList(store, action: PayloadAction<string[]>) {
      const initialValues = action.payload;
      initialValues.forEach((value) => {
        const item = createInitialListItem(store, value);
        store.linkedList.push(item);
        if (store.listHead !== store.listTail) {
          store.linkedList[store.listTail - 1].tail = false;
        }
        store.listTail += 1;
        store.listLength += 1;
      });
      store.linkedList[store.listTail - 1].extraClass = false;
    },
    removeFromTail(store) {
      if (store.listLength === 0) return;
      store.linkedList.pop();
      store.listTail -= 1;
      store.listLength -= 1;
      if (store.listHead !== store.listTail) {
        store.linkedList[store.listTail - 1].tail = true;
        store.linkedList[store.listTail - 1].extraClass = false;
      }
    },
    removeFromHead(store) {
      if (store.listLength === 0) return;
      store.linkedList.shift();
      store.linkedList.map((item) => item.index -= 1);
      if (store.linkedList[store.listHead] !== undefined) {
        store.linkedList[store.listHead].head = 'head';
      }
      store.listLength -= 1;
    },
  },
});

export const { initList, removeFromTail, removeFromHead } = linkedListSlice.actions;
