import { ElementStates } from '../../types/element-states';
import { TStringChar } from '../../types/string.types';

export const setCircleState = (arr: TStringChar[], indexes: number[], state: ElementStates): void =>
  indexes.forEach((index) => (arr[index].state = state));
