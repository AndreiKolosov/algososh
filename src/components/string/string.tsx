import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { DELAY_IN_MS } from '../../constants/delays';
import { getSteps, setCircleState } from './helpers';

export const StringComponent: React.FC = () => {
  const [stringChars, setStringChars] = useState<string[]>([]);
  const [animateSteps, setAnimateSteps] = useState<Array<string[]>>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const stringInputLimit = 11;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStringChars(e.target?.value.split(''));
  };

  const reverseString = () => {
    const steps = getSteps(stringChars);
    const length = steps.length;
    const end = length - 1;
    setAnimateSteps(steps);
    setCurrentStep(0);
    
    
    if (length > 1) {
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => {
          const nextStep = prevStep + 1;

          if (nextStep === end) {
            clearInterval(interval);
          }

          return nextStep;
        });
      }, DELAY_IN_MS);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reverseString();
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={submitHandler}>
        <Input onChange={changeHandler} isLimitText maxLength={stringInputLimit} />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={animateSteps.length > 1 && currentStep !== animateSteps.length - 1}
        />
      </form>
      <ul className={styles.list}>
        {animateSteps.length > 1 &&
          animateSteps[currentStep].map((char, i) => (
            <li key={i}>
              <Circle
                letter={char}
                state={setCircleState(i, stringChars.length - 1, currentStep, animateSteps.length - 1)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
