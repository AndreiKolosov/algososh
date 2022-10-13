import { ElementStates } from './../../types/element-states';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, TChar } from '../../types/stringReverse.types.';

const initialState: IInitialState = {
  stringArr: [],
  inProcess: false,
};

export const reverseStringSlice = createSlice({
  name: 'string',
  initialState,
  reducers: {
    setSortingStatus(store, action: PayloadAction<boolean>) {
      store.inProcess = action.payload;
    },
    setStringArr(store, action: PayloadAction<string[]>) {
      const charsArr = action.payload.map((el: string, i: number) => ({ value: el, index: i, status: ElementStates.Default }));
      store.stringArr = charsArr;
    },
    setSortedArr(store, action: PayloadAction<TChar[]>) {
      store.stringArr = action.payload;
    },
    setNewElementStatus(store, action: PayloadAction<{index: number, status: ElementStates}>) {
      const charElm = store.stringArr.find((el: TChar) => el.index === action.payload.index);
      if(charElm) {
        charElm.status = action.payload.status
      }
    }
  },
});

export const { setStringArr, setSortingStatus, setSortedArr, setNewElementStatus } = reverseStringSlice.actions;
