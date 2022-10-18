import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import styles from './value-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';

export type TValueControlProps = {
  extraClass?: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
};

export const ValueControlPanel: React.FC<TValueControlProps> = ({ setValue, value, extraClass = '', ...props }) => {

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
      <Button text="Добавить в head" extraClass={styles.panel__btn} />
      <Button text="Добавить в tail" extraClass={styles.panel__btn} />
      <Button text="Удалить из head" extraClass={styles.panel__btn} />
      <Button text="Удалить из tail" extraClass={styles.panel__btn} />
    </div>
  );
};
