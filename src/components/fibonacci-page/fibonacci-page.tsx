import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
// import { fibonacciSlice, setFibonacciNumber } from '../../services/slices/fibonacciSlaice';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const FibonacciPage: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const { number } = useAppSelector(store => store.fibonacci)
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // dispatch(setFibonacciNumber(Number(e?.target?.value)))
    // console.log(number)
  };


// const getFibonacci =  async (num: number) => {
//   let a = 1;
//   let b = 0;
//   let temp;
//   const tempSequence = [];

//   while (num >= 0) {
//     temp = a;
//     a += b;
//     b = temp;
//     tempSequence.push(b);
//     await sleep(500)
//     setArr([...tempSequence]);
    
//     num -= 1;
//   }
// };

const submitHandler = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={submitHandler}>
        <Input type="number" onChange={changeHandler} isLimitText max={19} min={1} />
        <Button
          type="submit"
          text="Рассчитать"
          // disabled={number <= 0 || number > 19}
          // isLoader={animateSteps.length > 1 && currentStep !== animateSteps.length - 1}
        />
      </form>
      <ul className={styles.list}>
        {/* {animateSteps.length >= 1 &&
          animateSteps[currentStep].map((char, i) => (
            <li key={i}>
              <Circle
                letter={char}
                state={setCircleState(i, stringChars.length - 1, currentStep, animateSteps.length - 1)}
              />
            </li>
          ))} */}
      </ul>
    </SolutionLayout>
  );
};
