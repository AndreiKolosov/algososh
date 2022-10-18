import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import styles from './index-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';

export type TIndexControlProps = {
  extraClass?: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
};

export const IndexControlPanel: React.FC<TIndexControlProps> = ({ setValue, value, extraClass = '', ...props }) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  return (
    <div className={`${styles.panel} ${extraClass}`} {...props}>
      <Input extraClass={styles.panel__input} placeholder="Введите индекс" onChange={handleInputChange} value={value} />
      <Button extraClass={styles.panel__btn} text="Добавить по индексу" />
      <Button extraClass={styles.panel__btn} text="Удалить по индексу" />
    </div>
  );
};
