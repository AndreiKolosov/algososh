import { ElementStates } from './../../types/element-states';

export const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const getSteps = (arr: string[]): Array<string[]> => {
  const steps = [[...arr]];

  if (arr.length <= 1) return steps;
  let start = 0;
  let end = arr.length - 1;
  const middle = Math.round(end / 2);

  while (start < middle) {
    swap(arr, start, end);
    steps.push([...arr]);
    start++;
    end--;
  }

  return steps;
};

export const setCircleState = (
  arrElementCurrentIndex: number,
  arrElementLastIndex: number,
  currentStep: number,
  lastStep: number,
) => {
  // arrElementCurrenIndex - индекс первого элемента в массиве шага,
  // arrElementLastIndex - индекс последнего элемента в массиве шага,
  // currentStep - текущий шаг(число),
  // lastStep - последний шаг(число),

  const isModified = currentStep === lastStep;

  if (isModified || arrElementCurrentIndex < currentStep || arrElementCurrentIndex > arrElementLastIndex - currentStep) {
    return ElementStates.Modified;
  }

  if (arrElementCurrentIndex === currentStep || arrElementCurrentIndex === arrElementLastIndex - currentStep) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};
