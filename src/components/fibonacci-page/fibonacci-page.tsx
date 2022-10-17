import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';
import { ElementStates } from '../../types/element-states';
import { TNumberElement } from '../../types/fibonacci.types';

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number>(1);
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [fibonacci, setFibonacci] = useState<JSX.Element[]>([]);
  const maxValue = 19;
  const minValue = 1;

  const renderFibonacci = (arr: TNumberElement[]) =>
    setFibonacci(
      arr.map((el, index) => (
        <li key={index}>
          <Circle letter={String(el.value)} state={el.state} tail={String(index)} />
        </li>
      )),
    );

  const getFibonacci = async (n: number) => {
    let arr: TNumberElement[] = [];
    let prev = 1;
    let next = 1;
    for (let i = 0; i < n; i++) {
      await delay(SHORT_DELAY_IN_MS);
      arr.push({ value: prev, state: ElementStates.Default });
      renderFibonacci(arr);

      let temp = next;
      next = prev + next;
      prev = temp;
    }
    await delay(SHORT_DELAY_IN_MS);
    arr.push({ value: prev, state: ElementStates.Default });
    renderFibonacci(arr);
  }

  const checkValidity = () => {
    if(number) {
      if(number <= 0 || number > 19) return true;
      return false
    }
    return false
  }

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
   setNumber(Number(e.target.value))
  };

  const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInProcess(true);
    await getFibonacci(number);
    setInProcess(false);
    };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          type="number"
          placeholder='Введите число'
          onChange={changeHandler}
          value={number || ''}
          isLimitText
          max={maxValue}
          min={minValue}
        />
        <Button
          type="submit"
          text="Рассчитать"
          disabled={checkValidity()}
          isLoader={inProcess}
        />
      </form>
      <ul className={styles.list}>
        {fibonacci}
      </ul>
    </SolutionLayout>
  );
};
