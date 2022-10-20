import React, { ChangeEvent, useState } from "react";
import styles from './stack-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Stack } from './stack';
import { ElementStates } from '../../types/element-states';
import { delay } from '../../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { TProcess, TStackElement } from '../../types/stack.types';

export const StackPage: React.FC = () => {
  const stackInstance = new Stack<TStackElement>();
  const [value, setValue] = useState<string>('');
  const [stack, setStack] = useState<Stack<TStackElement>>(stackInstance);
  const [stackToRender, setStackToRender] = useState<JSX.Element[]>([]);
  const [inProcess, setInProcess] = useState<TProcess>({ isAdding: false, isRemoving: false });
  const maxInputValueLength = 4;

  const renderStack = () => {
    const stackTemp = stack.getElements();

    const elements = stackTemp.map((item, index) => (
      <li key={index}>
        <Circle
          state={item.state}
          letter={item.value || ''}
          index={index}
          head={stack.getSize() - 1 === index ? 'top' : ''}
        />
      </li>
    ));
    setStackToRender(elements);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value as string);
  };

  const handleAdd = async () => {
    setInProcess((state) => ({ ...state, isAdding: true }));
    const inputValue = value;
    const stackTemp = stack;
    stackTemp.push({ value: inputValue, state: ElementStates.Changing });
    setValue('');
    setStack(stackTemp);
    renderStack();
    await delay(SHORT_DELAY_IN_MS);
    const stackPeak = stackTemp.peak();
    if (stackPeak) stackPeak.state = ElementStates.Default;
    renderStack();
    setInProcess((state) => ({ ...state, isAdding: false }));
  };

  const handleRemove = async () => {
    setInProcess((state) => ({ ...state, isRemoving: true }));
    const stackTemp = stack;
    const stackPeak = stackTemp.peak();
    if (stackPeak) stackPeak.state = ElementStates.Changing;
    renderStack();
    await delay(SHORT_DELAY_IN_MS);
    stackTemp.pop();
    setStack(stackTemp);
    renderStack();
    setInProcess((state) => ({ ...state, isRemoving: false }));
  };

  const handleClear = async () => {
    setInProcess((state) => ({ ...state, isRemoving: true }));
    const stackTemp = stack;
    stackTemp.clear();
    setStack(stackTemp);
    renderStack();
    setInProcess((state) => ({ ...state, isRemoving: false }));
  };

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
          disabled={inProcess.isAdding || (!value && stack.getSize() === 0)}
          extraClass={styles.controls__removeBtn}
        />
        <Button
          type="button"
          text="Очистить"
          onClick={handleClear}
          disabled={inProcess.isAdding || inProcess.isRemoving || (!value && stack.getSize() === 0)}
        />
      </div>
      <ul className={styles.list}>{stackToRender}</ul>
    </SolutionLayout>
  );
};
