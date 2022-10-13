import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/fibonacci.types';

const initialState: IInitialState = {
  number: null,
  numbersArr: [],
  inProcess: false,
};

export const fibonacciSlice = createSlice({
  name: 'fibonacci',
  initialState,
  reducers: {
    setNumber(store, action: PayloadAction<number>) {
      store.number = action.payload
    },
    pushNumber(store, action: PayloadAction<number>) {
      const num = action.payload;
      store.numbersArr = [...store.numbersArr, num];
    },
    setCountingStatus(store, action: PayloadAction<boolean>) {
      store.inProcess = action.payload;
    },
    clearArr(store) {
      store.numbersArr = [];
    },
    clearNumber(store) {
      store.number = null;
    }
  },
});

export const {
  setNumber,
  pushNumber,
  setCountingStatus,
  clearArr,
  clearNumber,
} = fibonacciSlice.actions;
