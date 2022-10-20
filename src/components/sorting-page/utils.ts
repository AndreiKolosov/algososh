import { ElementStates } from '../../types/element-states';

export const createArray = (min: number, max: number) => {
  const randomLen = Math.floor(Math.random() * (max - min)) + min;
  const randomNumArray = Array.from({ length: randomLen }, () => Math.floor(Math.random() * 100));
  const randomArray = randomNumArray.map((el: number) => ({ value: el, state: ElementStates.Default }));
  return randomArray;
};
