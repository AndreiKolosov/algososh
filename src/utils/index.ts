export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function swap<T>(array: T[], i: number, j: number): void {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}


