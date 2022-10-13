import { ElementStates } from './../../types/element-states';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/stack.types';

const initialState: IInitialState = {
  stack: [],
  peak: null,
  inProcess: false,
};

export const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    push(store, action: PayloadAction<string>) {
      store.stack.push({ value: action.payload, state: ElementStates.Changing, index: store.stack.length - 1 });
      store.peak = { value: action.payload, state: ElementStates.Changing, index: store.stack.length - 1 };
    },
    pop(store) {
      store.stack.pop();
      if (store.stack.length) store.peak = store.stack[store.stack.length - 1];
      if (!store.stack.length) store.peak = null;
    },
    clear(store) {
      store.stack = [];
    },
    setInProcess(store, action: PayloadAction<boolean>) {
      store.inProcess = action.payload;
    },
    setItemStateToDefault(store) {
      store.stack[store.stack.length - 1].state = ElementStates.Default; 
    },
    setItemStateToChanging(store) {
      store.stack[store.stack.length - 1].state = ElementStates.Changing; 
    }
  },
});

export const { push, pop, clear, setInProcess, setItemStateToDefault, setItemStateToChanging } = stackSlice.actions;
