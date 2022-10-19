import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import styles from './value-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';
import { TInProcess } from '../../../../types/linkedList.types';

export type TValueControlProps = {
  extraClass?: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  processState: TInProcess;
  isEmpty: boolean;
  handlers: {
    handleAddToHead: () => void;
    handleAddToTail: () => void;
    handleRemoveFromHead: () => void;
    handleRemoveFromTail: () => void;
  };
};

export const ValueControlPanel: React.FC<TValueControlProps> = ({ setValue, value, processState, handlers, isEmpty, extraClass = '', ...props }) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  return (
    <div className={`${styles.panel} ${extraClass}`} {...props}>
      <Input
        extraClass={styles.panel__input}
        onChange={handleInputChange}
        value={value}
        placeholder="Введите значение"
      />
      <Button
        text="Добавить в head"
        extraClass={styles.panel__btn}
        onClick={handlers.handleAddToHead}
        isLoader={processState.isAddingToHead}
        disabled={!value}
      />
      <Button
        text="Добавить в tail"
        extraClass={styles.panel__btn}
        onClick={handlers.handleAddToTail}
        isLoader={processState.isAddingToTail}
        disabled={!value}
      />
      <Button
        text="Удалить из head"
        extraClass={styles.panel__btn}
        onClick={handlers.handleRemoveFromHead}
        isLoader={processState.isRemovingFormHead}
        disabled={isEmpty}
      />
      <Button
        text="Удалить из tail"
        extraClass={styles.panel__btn}
        onClick={handlers.handleRemoveFromTail}
        isLoader={processState.isRemovingFormTail}
        disabled={isEmpty}
      />
    </div>
  );
};
