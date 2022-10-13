import { ElementStates } from './element-states';

export type TParams = { stringChars: string[]; type: string };

export type TChar = {
  value: string;
  index: number;
  status: ElementStates;
};

export interface IInitialState {
  stringArr: TChar[];
  inProcess: boolean;
}

