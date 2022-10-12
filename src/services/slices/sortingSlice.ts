import { ElementStates } from './../../types/element-states';
import { createSlice } from '@reduxjs/toolkit';
import { IInitialState, SortDirection, SortMethods } from '../../types/sorting.types';
import { TAction } from '../../types';

const initialState: IInitialState = {
  sortDirection: SortDirection.Ascending,
  sortMethod: SortMethods.SelectionSort,
  arrForSort: [],
  inProcess: false,
};

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortMethod(store, action) {
      store.sortMethod = action.payload;
    },
    setSortDirection(store, action: TAction<SortDirection>) {
      store.sortDirection = action.payload;
    },
    createArrayForSort(store, action: TAction<{ min: number, max: number }>) {
      const min = action.payload.min;
      const max = action.payload.max;
      const randomLen = Math.floor(Math.random() * (max - min)) + min;
      const randomNumArray = Array.from({ length: randomLen }, () => Math.floor(Math.random() * 100));
      const randomArray = randomNumArray.map((el: number) => ({ value: el, status: ElementStates.Default }));
      store.arrForSort = randomArray;
    },
    setSortingStatus(store, action) {
      store.inProcess = action.payload;
    },
  },
});

export const { setSortMethod, setSortDirection, createArrayForSort, setSortingStatus } = sortingSlice.actions;
