import { RootState } from '../../../types';

// Selectors________________________________________
export const getArrForSort = (store: RootState) => store.sorting.arrForSort;
export const getSortDirection = (store: RootState) => store.sorting.sortDirection;
export const getSortMethod = (store: RootState) => store.sorting.sortMethod;

