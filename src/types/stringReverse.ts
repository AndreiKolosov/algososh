export type TParams = { stringChars: string[]; type: string };

export type TChar = {
  value: string;
  index: string;
  status: 'Changing' | 'Modified' | 'Default';
};

export interface IInitialState {
  stringArr: TChar[];
  inProcess: boolean;
}

