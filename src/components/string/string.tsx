import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { ElementStates } from '../../types/element-states';

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<string>(''); 
  const dispatch = useAppDispatch();
  const stringInputLimit = 11;
  const { inProcess, stringArr } = useAppSelector(store => store.string);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target?.value);
  };
  
  
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stringChars = string.split('');
    dispatch({ type: 'SORT_STRING', stringChars });
    setString('');
    console.log(stringArr, 'str')
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={submitHandler}>
        <Input onChange={changeHandler} value={string} isLimitText maxLength={stringInputLimit} />
        <Button type="submit" text="Развернуть" disabled={!string} isLoader={inProcess} />
      </form>
      <ul className={styles.list}>
        {stringArr && stringArr.map((char, i) => (
            <li key={i}>
              <Circle
                letter={char.value}
                state={ElementStates[char.status]}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
