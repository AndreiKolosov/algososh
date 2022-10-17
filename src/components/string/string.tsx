import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { ElementStates } from '../../types/element-states';
import { delay, swap } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';
import { TStringChar } from '../../types/string.types';
import { setCircleState } from './helpers';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [stringChars, setStringChars] = useState<TStringChar[]>([]); 
  const [reversedString, setReversedString] = useState<JSX.Element[]>([]);
  const [inProcess, setInProcess] = useState<boolean>(false);
  const stringInputLimit = 11;

  const renderString = () =>
  stringChars &&  setReversedString( 
      stringChars.map((char, index) => (
        <li key={index}>
          <Circle letter={char.value} state={char.state} />
        </li>
  )));

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setStringChars(e.target.value.split('').map((value, index) => ({
      value,
      index,
      state: ElementStates.Default 
    })))    
  };

  const reverseString = async(array: TStringChar[]) => {
    const arr = array;
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
      await delay(DELAY_IN_MS);
      setCircleState(arr, [start, end], ElementStates.Changing)
      setStringChars(arr);
      renderString();
      await delay(DELAY_IN_MS);
      swap<TStringChar>(arr, start, end);
      setCircleState(arr, [start, end], ElementStates.Modified);
      setStringChars(arr);
      renderString();
      start++;
      end--;
    }
    if (start === end) {
      await delay(DELAY_IN_MS);
      setCircleState(arr, [start], ElementStates.Changing);
      setStringChars(arr);
      renderString();
      await delay(DELAY_IN_MS);
      setCircleState(arr, [start], ElementStates.Modified);
      setStringChars(arr);
      renderString();
    }
  }
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInProcess(true);
    setInputValue('');
    renderString();
    
    if (stringChars?.length === 1) {
      await delay(DELAY_IN_MS);
      setCircleState(stringChars, [0], ElementStates.Changing);
      setStringChars(stringChars);
      renderString();
      await delay(DELAY_IN_MS);
      setCircleState(stringChars, [0], ElementStates.Modified);
      setStringChars(stringChars);
      renderString();
    }
    if (stringChars && stringChars?.length > 1) reverseString(stringChars);
    
    setInProcess(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={submitHandler}>
        <Input onChange={changeHandler} value={inputValue} isLimitText maxLength={stringInputLimit} />
        <Button type="submit" text="Развернуть" isLoader={inProcess} disabled={!inputValue || inProcess}/>
      </form>
      <ul className={styles.list}>
        {reversedString}
      </ul>
    </SolutionLayout>
  );
};
