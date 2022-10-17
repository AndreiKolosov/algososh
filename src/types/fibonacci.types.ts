import { ElementStates } from './element-states';

export type TParams = { num: number; type: string };

export interface IInitialState {
  number: number | null;
  numbersArr: number[];
  inProcess: boolean;
}
// =================================
export type TNumberElement = {
  value: number;
  state: ElementStates;
};