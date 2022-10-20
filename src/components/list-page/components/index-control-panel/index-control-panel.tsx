import React, { ChangeEvent } from 'react';
import styles from './index-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';
import { TIndexControlProps } from '../../../../types/linkedList.types';

export const IndexControlPanel: React.FC<TIndexControlProps> = ({
  setValue, index, isAddDisabled, processState, handlers, extraClass = '', ...props
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  return (
    <div className={`${styles.panel} ${extraClass}`} {...props}>
      <Input
        extraClass={styles.panel__input}
        placeholder="Введите индекс"
        onChange={handleInputChange}
        value={index}
      />
      <Button
        extraClass={styles.panel__btn}
        text="Добавить по индексу"
        onClick={handlers.handleAddByIndex}
        disabled={!index || isAddDisabled || processState.isRemovingByIndex}
        isLoader={processState.isAddingByIndex}
      />
      <Button
        extraClass={styles.panel__btn}
        text="Удалить по индексу"
        disabled={!index || processState.isAddingByIndex}
        onClick={handlers.handleRemoveByIndex}
        isLoader={processState.isRemovingByIndex}
      />
    </div>
  );
};
