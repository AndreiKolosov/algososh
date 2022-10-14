import React, { ChangeEvent, useState } from "react";
import styles from './stack-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { clear } from '../../services/slices/stackSlice';
import { ADD_TO_STACK, REMOVE_FROM_STACK } from '../../services/sagas/actions/stackActions';

export const StackPage: React.FC = () => {
const [value, setValue] = useState<string>('');
const maxInputValueLength = 4;
const { inProcess, stack, peak } = useAppSelector((store) => store.stack);
const dispatch = useAppDispatch();

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target?.value);
}

const handleAdd = () => {
  dispatch({ type: ADD_TO_STACK, value })
  setValue('');
}

const handleRemove = () => {
  dispatch({ type: REMOVE_FROM_STACK })
  setValue('');
}

const handleClear = () => {
  dispatch(clear());
  setValue('');
}

  return (
    <SolutionLayout title="Стек">
      <div className={styles.controls}>
        <Input
          isLimitText
          maxLength={maxInputValueLength}
          value={value}
          onChange={handleInputChange}
          placeholder="Введите текст"
          disabled={stack.length >= 6}
        />
        <Button type="button" text="Добавить" onClick={handleAdd} disabled={inProcess || stack.length >= 6} />
        <Button type="button" text="Удалить" onClick={handleRemove} disabled={inProcess} extraClass={styles.controls__removeBtn}/>
        <Button type="button" text="Очистить" onClick={handleClear} disabled={inProcess} />
      </div>
      <ul className={styles.list}>
        {stack.map((item, index) => (
          <li key={index}>
            <Circle
              state={item.state}
              letter={item.value}
              index={index}
              head={stack.length - 1 === index && item.value === peak?.value ? 'top' : ''}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
