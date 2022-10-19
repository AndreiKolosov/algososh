import React, { ChangeEvent } from 'react';
import styles from './value-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';
import {  TValueControlProps } from '../../../../types/linkedList.types';

export const ValueControlPanel: React.FC<TValueControlProps> = ({
  setValue, value, processState, handlers, disabledAdd, isEmpty, extraClass = '', ...props
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  return (
    <div className={`${styles.panel} ${extraClass}`} {...props}>
      <Input
        extraClass={styles.panel__input}
        onChange={handleInputChange}
        value={value}
        disabled={disabledAdd}
        placeholder="Введите значение"
        isLimitText
        maxLength={4}
      />
      <Button
        text="Добавить в head"
        extraClass={styles.panel__btn}
        onClick={handlers.handleAddToHead}
        isLoader={processState.isAddingToHead}
        disabled={!value || processState.isAddingToTail || disabledAdd}
      />
      <Button
        text="Добавить в tail"
        extraClass={styles.panel__btn}
        onClick={handlers.handleAddToTail}
        isLoader={processState.isAddingToTail}
        disabled={!value || processState.isAddingToHead}
      />
      <Button
        text="Удалить из head"
        extraClass={styles.panel__btn}
        onClick={handlers.handleRemoveFromHead}
        isLoader={processState.isRemovingFormHead && !processState.isRemovingByIndex}
        disabled={isEmpty || processState.isRemovingFormTail}
      />
      <Button
        text="Удалить из tail"
        extraClass={styles.panel__btn}
        onClick={handlers.handleRemoveFromTail}
        isLoader={processState.isRemovingFormTail && !processState.isRemovingByIndex}
        disabled={isEmpty || processState.isRemovingFormHead}
      />
    </div>
  );
};
