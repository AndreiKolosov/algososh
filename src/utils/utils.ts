import { ElementStates } from '../types/element-states';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function swap<T>(array: T[], i: number, j: number): void {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export const createArray = (min: number, max: number) => {
  const randomLen = Math.floor(Math.random() * (max - min)) + min;
  const randomNumArray = Array.from({ length: randomLen }, () => Math.floor(Math.random() * 100));
  const randomArray = randomNumArray.map((el: number) => ({ value: el, state: ElementStates.Default }));
  return randomArray;
}
// =========================================================