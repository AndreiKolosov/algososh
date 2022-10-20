import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { getFibonacciNumbers } from './utils';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils';

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number>(1);
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [fibonacci, setFibonacci] = useState<number[]>([]);
  const maxValue = 19;
  const minValue = 1;

  const renderFibonacci = async (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setFibonacci((state) => [...state, arr[i]]);
    }
  };

  const checkValidity = () => {
    if (number) {
      if (number <= 0 || number > 19) return true;
      return false;
    }
    return false;
  };

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(e.target.value));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInProcess(true);
    setFibonacci([])
    const arr = getFibonacciNumbers(number);
    await renderFibonacci(arr);
    setInProcess(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          type="number"
          placeholder="Введите число"
          onChange={changeHandler}
          value={number || ''}
          isLimitText
          max={maxValue}
          min={minValue}
        />
        <Button type="submit" text="Рассчитать" disabled={checkValidity()} isLoader={inProcess} />
      </form>
      <ul className={styles.list}>
        {fibonacci.map((number, index) => (
          <li key={index}>
            <Circle letter={String(number)} state={ElementStates.Default} tail={String(index)} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
