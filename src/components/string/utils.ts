import { swap } from '../../utils';
import { ElementStates } from '../../types/element-states';
import { TStringChar } from '../../types/string.types';

export const changeCirclesState = (arr: TStringChar[], indices: number[], state: ElementStates): void =>
  indices.forEach((index) => (arr[index].state = state));

export const prepareReverseStep = (arr: string[]) => {
  return arr.map((value, index) => ({
    value,
    index,
    state: ElementStates.Default,
  }));
}

export const getReversingStringSteps = (str: string): string[][] => {
  let arr = str.split('');
  let steps: string[][] = [[...arr]]
  let start = 0;
  let end = arr.length - 1;

  if (arr.length <= 1) return steps;

  while (start < end) {
    swap<string>(arr, start, end)
    steps.push([...arr])
    start++;
    end--;
  } 
  return steps;
}
