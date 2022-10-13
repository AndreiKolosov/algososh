import { ElementStates } from './../../types/element-states';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, SortDirection, SortMethods, TArrElement } from '../../types/sorting.types';

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
    setSortDirection(store, action: PayloadAction<SortDirection>) {
      store.sortDirection = action.payload;
    },
    createArrayForSort(store, action: PayloadAction<{ min: number; max: number }>) {
      const min = action.payload.min;
      const max = action.payload.max;
      const randomLen = Math.floor(Math.random() * (max - min)) + min;
      const randomNumArray = Array.from({ length: randomLen }, () => Math.floor(Math.random() * 100));
      const randomArray = randomNumArray.map((el: number) => ({ value: el, status: ElementStates.Default }));
      store.arrForSort = randomArray;
    },
    setSortingStatus(store, action: PayloadAction<boolean>) {
      store.inProcess = action.payload;
    },
    setNewArr(store, action: PayloadAction<TArrElement[]>) {
      store.arrForSort = action.payload;
    },
    setNewItemStatus(store, action: PayloadAction<{index: number, status: ElementStates}>) {
      store.arrForSort[action.payload.index].status = action.payload.status
    },
    resetElementsStatuses(store) {
      store.arrForSort.map((el) => el.status = ElementStates.Default)
    }
  },
});

export const {
  setSortMethod,
  setSortDirection,
  createArrayForSort,
  setSortingStatus,
  setNewArr,
  setNewItemStatus,
  resetElementsStatuses,
} = sortingSlice.actions;
