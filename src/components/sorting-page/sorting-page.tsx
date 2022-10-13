import React, { ChangeEvent } from 'react';
import styles from './sorting-page.module.css';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { START_SORTING } from '../../services/sagas/actions/sortingActions';
import { createArrayForSort, setSortDirection, setSortMethod } from '../../services/slices/sortingSlice';
import { SortDirection, SortMethods } from '../../types/sorting.types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

export const SortingPage: React.FC = () => {
  const { inProcess, arrForSort, sortMethod, sortDirection } = useAppSelector((store) => store.sorting)
  const dispatch = useAppDispatch();

  const createArr = () => dispatch(createArrayForSort({min: 3, max: 17}))

  const radioChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSortMethod(value))
  }
  const startAscendingSort = () => {
    dispatch(setSortDirection(SortDirection.Ascending))
    dispatch({ type: START_SORTING })
  };

  const startDescendingSort = () => {
    dispatch(setSortDirection(SortDirection.Descending));
    dispatch({ type: START_SORTING });
  };

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
        <Button text="Новый массив" onClick={createArr} disabled={inProcess} />
      </div>
      <ul className={styles.list}>
        {arrForSort &&
          arrForSort.map((el, i) => (
            <li key={i}>
              <Column index={el.value} state={el.status} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
