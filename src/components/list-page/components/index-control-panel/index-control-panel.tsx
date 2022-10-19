import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import styles from './index-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';
import { TInProcess } from '../../../../types/linkedList.types';

export type TIndexControlProps = {
  extraClass?: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  processState: TInProcess;
  handlers: {
    handleAddByIndex: () => void;
    handleRemoveByIndex: () => void;
  };
};

export const IndexControlPanel: React.FC<TIndexControlProps> = ({ setValue, value, processState, handlers, extraClass = '', ...props }) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  return (
    <div className={`${styles.panel} ${extraClass}`} {...props}>
      <Input
        extraClass={styles.panel__input}
        placeholder="Введите индекс"
        onChange={handleInputChange}
        value={value}
      />
      <Button
        extraClass={styles.panel__btn}
        text="Добавить по индексу"
        onClick={handlers.handleAddByIndex}
        isLoader={processState.isAddingByIndex}
      />
      <Button
        extraClass={styles.panel__btn}
        text="Удалить по индексу"
        onClick={handlers.handleRemoveByIndex}
        isLoader={processState.isRemovingByIndex}
      />
    </div>
  );
};
