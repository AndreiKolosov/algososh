import { ElementStates } from './element-states';

export type TStackSagaParams = { value: string; type: string };

export type TStackElement = {
  value: string,
  state: ElementStates
  index: number
}

export interface IInitialState {
  stack: TStackElement[];
  peak: TStackElement | null;
  inProcess: boolean;
}
