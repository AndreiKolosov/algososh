import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/stringReverse';

const initialState: IInitialState = {
  stringArr: [],
  inProcess: false,
};

export const stringSlice = createSlice({
  name: 'string',
  initialState,
  reducers: {
    setSortingStatus(store, action) {
      store.inProcess = action.payload;
    },
    setStringArr(store, action) {
      const charsArr = action.payload.map((el: string, i: number) => ({ value: el, index: i, status: 'Default' }));
      store.stringArr = charsArr;
    },
    setSortedArr(store, action) {
      store.stringArr = action.payload;
    },
    setNewElementStatus(store, action) {
      const charElm = store.stringArr.find(el => el.index === action.payload.index);
      if(charElm) {
        charElm.status = action.payload.status
      }
    }
  },
});

export const { setStringArr, setSortingStatus, setSortedArr, setNewElementStatus } = stringSlice.actions;
