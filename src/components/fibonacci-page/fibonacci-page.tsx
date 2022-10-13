import React, { ChangeEvent, FormEvent } from "react";
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { FIND_FIBONACCI } from '../../services/sagas/actions/fibonacci';
import { setNumber } from '../../services/slices/fibonacciSlice';
import { useAppDispatch, useAppSelector } from '../../services/hooks';


export const FibonacciPage: React.FC = () => {
  const { number, numbersArr, inProcess } = useAppSelector((store) => store.fibonacci);
  const maxValue = 19;
  const minValue = 1;
  const dispatch = useAppDispatch();

  const checkValidity = () => {
    if(number) {
      if(number <= 0 || number > 19) return true;
      return false
    }
    return false
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNumber(Number(e.target.value)));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: FIND_FIBONACCI})  
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
        {numbersArr && numbersArr.map((num, i) => (
            <li key={i}>
              <Circle
                letter={num.toString()}
                index={i}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
