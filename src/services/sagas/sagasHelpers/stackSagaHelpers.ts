import { RootState } from './../../../types/index';
// Selectors________________________________________
export const getPeak = (store: RootState) => store.stack.peak;

