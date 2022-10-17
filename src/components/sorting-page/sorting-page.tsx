import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './sorting-page.module.css';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { SortDirection, SortMethods, TArrayElement } from '../../types/sorting.types';
import { ElementStates } from '../../types/element-states';
import { createArray, delay, swap } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<TArrayElement[]>([]);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Ascending);
  const [sortMethod, setMethod] = useState<SortMethods>(SortMethods.SelectionSort);
  const [inProcess, setInProcess] = useState<boolean>(false);
  const minLength = 3;
  const maxLength = 17;

  const selectionSort = async (array: TArrayElement[], direction: SortDirection) => {
    const { length } = array;
    for (let i = 0; i < length; i += 1) {
      let minInd = i;
      array[minInd].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j += 1) {
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
        if (
          (direction === SortDirection.Ascending && array[j].value < array[minInd].value) ||
          (direction === SortDirection.Descending && array[j].value > array[minInd].value)
        ) {
          minInd = j;
          array[j].state = ElementStates.Changing;
          array[minInd].state = i === minInd ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== minInd) array[j].state = ElementStates.Default;
        setArray([...array]);
      }
      if (minInd !== i) swap<TArrayElement>(array, minInd, i);
      array[minInd].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
  };

  const bubbleSort = async (array: TArrayElement[], direction: SortDirection) => {
    const { length } = array;
    for (let i = 0; i < length; i += 1) {
      for (let j = 0; j < length - i - 1; j += 1) {
        array[j].state = ElementStates.Changing;
        if (array[j + 1]) array[j + 1].state = ElementStates.Changing;

        setArray([...array]);
        await delay(SHORT_DELAY_IN_MS);
        if (
          (direction === SortDirection.Ascending && array[j].value > array[j + 1]?.value) ||
          (direction === SortDirection.Descending && array[j].value < array[j + 1]?.value)
        ) {
          swap(array, j + 1, j);
        }

        array[j].state = ElementStates.Default;
        if (array[j + 1]) array[j + 1].state = ElementStates.Default;
        setArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }
  }

  const createNewArr = () => setArray(createArray(minLength, maxLength));
  const radioChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as SortMethods;
    setMethod(value);
  };

  const startAscendingSort = async () => {
    setInProcess(true);
    setSortDirection(SortDirection.Ascending);
    if (sortMethod === SortMethods.SelectionSort) {
      await selectionSort(array, SortDirection.Ascending);
    }
    if (sortMethod === SortMethods.BubbleSort) {
      await bubbleSort(array, SortDirection.Ascending);
    }
    setInProcess(false);
  };

  const startDescendingSort = async () => {
    setInProcess(true);
    setSortDirection(SortDirection.Descending);
    if (sortMethod === SortMethods.SelectionSort) {
      await selectionSort(array, SortDirection.Descending);
    }
    if (sortMethod === SortMethods.BubbleSort) {
      await bubbleSort(array, SortDirection.Descending);
    }
    setInProcess(false);
  };

  useEffect(() => setArray(createArray(minLength, maxLength)), []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls}>
        <RadioInput
          label="Выбор"
          name="sortMethod"
          value={SortMethods.SelectionSort}
          checked={sortMethod === SortMethods.SelectionSort}
          disabled={inProcess}
          onChange={radioChangeHandler}
        />
        <RadioInput
          label="Пузырек"
          name="sortMethod"
          value={SortMethods.BubbleSort}
          checked={sortMethod === SortMethods.BubbleSort}
          disabled={inProcess}
          onChange={radioChangeHandler}
        />
        <div className={styles.controls__directionControls}>
          <Button
            extraClass={styles.controls__directionControlBtn}
            text="По возрастанию"
            onClick={startAscendingSort}
            isLoader={inProcess && sortDirection === SortDirection.Ascending}
            disabled={inProcess && sortDirection !== SortDirection.Ascending}
          />
          <Button
            extraClass={styles.controls__directionControlBtn}
            text="По убыванию"
            onClick={startDescendingSort}
            isLoader={inProcess && sortDirection === SortDirection.Descending}
            disabled={inProcess && sortDirection !== SortDirection.Descending}
          />
        </div>
        <Button text="Новый массив" onClick={createNewArr} disabled={inProcess} />
      </div>
      <ul className={styles.list}>
        {array.map((el, i) => (
          <li key={i}>
            <Column index={el.value} state={el.state} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};;
