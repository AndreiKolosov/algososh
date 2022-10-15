import { ElementStates } from './../../types/element-states';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/linkedList.types';

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
        const item = {
          value,
          index: store.listTail,
          head: store.listHead === store.listTail ? 'head' : '',
          tail: true,
          state: ElementStates.Default,
          extraClass: true,
          extraClassModifier: ElementStates.Default
        };
        store.linkedList.push(item);
        if (store.listHead !== store.listTail) {
          store.linkedList[store.listTail - 1].tail = false;
        }
        store.listTail += 1;
        store.listLength += 1;
      });
    }
  },
});

export const { initList } = linkedListSlice.actions;
