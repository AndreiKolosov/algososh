import React, { ChangeEvent, useState } from "react";
import styles from './stack-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Stack } from '../../utils/stack';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export type TStackElement = {
  value: string;
  state: ElementStates;
};

export type TProcess = { isAdding: boolean, isRemoving: boolean}

export const StackPage: React.FC = () => {
  const stackInstance = new Stack<TStackElement>();
  const [value, setValue] = useState<string>('');
  const [stack, setStack] = useState<Stack<TStackElement>>(stackInstance);
  const [inProcess, setInProcess] = useState<TProcess>({ isAdding: false, isRemoving: false});
  const maxInputValueLength = 4;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value as string);
  }

  const handleAdd = async() => {
    setInProcess((state) => ({...state, isAdding: true}));
    const inputValue = value;
    const stackTemp = stack;
    stackTemp.push({ value: inputValue, state: ElementStates.Changing });
    setValue('');
    setStack(stackTemp);
    await delay(SHORT_DELAY_IN_MS);
    const stackPeak = stackTemp.peak();
    if(stackPeak) stackPeak.state = ElementStates.Default;
    setInProcess((state) => ({ ...state, isAdding: false }));
  }

  const handleRemove = async() => {
    setInProcess((state) => ({ ...state, isRemoving: true }));
    const stackTemp = stack;
    const stackPeak = stackTemp.peak();
    if (stackPeak) stackPeak.state = ElementStates.Changing;
    await delay(SHORT_DELAY_IN_MS);
    stackTemp.pop();
    setStack(stackTemp);
    setInProcess((state) => ({ ...state, isRemoving: false }));
  }

  const handleClear = async() => {
    setInProcess((state) => ({ ...state, isRemoving: true }));
    const stackTemp = stack;
    stackTemp.clear();
    setStack(stackTemp);
    setInProcess((state) => ({ ...state, isRemoving: false }));
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
          disabled={stack.getSize() >= 6}
        />
        <Button
          type="button"
          text="Добавить"
          onClick={handleAdd}
          isLoader={inProcess.isAdding}
          disabled={inProcess.isRemoving || stack.getSize() >= 6 || !value}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={handleRemove}
          isLoader={inProcess.isRemoving}
          disabled={inProcess.isAdding}
          extraClass={styles.controls__removeBtn}
        />
        <Button
          type="button"
          text="Очистить"
          onClick={handleClear}
          disabled={inProcess.isAdding || inProcess.isRemoving}
        />
      </div>
      <ul className={styles.list}>
        {stack.getElements().map((item, index) => (
          <li key={index}>
            <Circle
              state={item.state}
              letter={item.value || ''}
              index={index}
              head={stack.getSize() - 1 === index  ? 'top' : ''}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
