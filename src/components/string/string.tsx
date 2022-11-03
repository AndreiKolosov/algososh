import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ElementStates } from '../../types/element-states';
import { delay} from '../../utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { TStringChar } from '../../types/string.types';
import { getReversingStringSteps, prepareReverseStep, changeCirclesState } from './utils';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [reversedString, setReversedString] = useState<JSX.Element[]>([]);
  const [inProcess, setInProcess] = useState<boolean>(false);
  const stringInputLimit = 11;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const renderString = (chars: TStringChar[]) => {
    setReversedString(
      chars.map((char, index) => (
      <li key={index}>
        <Circle letter={char.value} state={char.state} />
      </li>
    ))
    )
  }

  const reverseString = async () => {
    const steps = getReversingStringSteps(inputValue);
    const modifiedIndices: number[] = [];
    let changingIndices: number[] = [];
    let currentStep = prepareReverseStep(steps[0]);
    renderString(currentStep);
    if (steps?.length === 1) {
      await delay(SHORT_DELAY_IN_MS);
      changeCirclesState(currentStep, [0], ElementStates.Modified);
      renderString(currentStep);
    } else {
      let start = 0;
      const end = steps.length - 1;
      let firstInd = 0;
      let lastInd = steps[0].length - 1;
      while (start < end) {
        currentStep = prepareReverseStep(steps[start]);
        if (start > 0) {
          await delay(SHORT_DELAY_IN_MS);
          changeCirclesState(currentStep, modifiedIndices, ElementStates.Modified);
          renderString(currentStep);
        }
        changingIndices = [firstInd, lastInd];
        await delay(SHORT_DELAY_IN_MS);
        changeCirclesState(currentStep, changingIndices, ElementStates.Changing);
        renderString(currentStep);
        modifiedIndices.push(firstInd, lastInd);
        start++;
        firstInd++;
        lastInd--;
      }
      await delay(SHORT_DELAY_IN_MS);
      currentStep = prepareReverseStep(steps[end]);
      changeCirclesState(currentStep, modifiedIndices, ElementStates.Modified);
      renderString(currentStep);
      await delay(SHORT_DELAY_IN_MS);
      modifiedIndices.push(end)
      changeCirclesState(currentStep, modifiedIndices, ElementStates.Modified);
      renderString(currentStep);
    }

    }
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInProcess(true);
    setInputValue('');
    setReversedString([])
    await reverseString()
    setInProcess(false);
  };
  
  return (
    <SolutionLayout title='Строка'>
      <form className={styles.form} onSubmit={submitHandler}>
        <Input onChange={changeHandler} value={inputValue} isLimitText maxLength={stringInputLimit} />
        <Button type='submit' text='Развернуть' isLoader={inProcess} disabled={!inputValue || inProcess} />
      </form>
      <ul className={styles.list}>
        {reversedString}
      </ul>
    </SolutionLayout>
  );
};
