import React from 'react';
import styles from './value-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';
import { useAppDispatch } from '../../../../services/hooks';
import { removeFromHead, removeFromTail } from '../../../../services/slices/linkedListSlice';

export const ValueControlPanel: React.FC<{ extraClass?: string }> = ({ extraClass = '', ...props }) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromTail = () => dispatch(removeFromTail())
  const handleRemoveFromHead = () => dispatch(removeFromHead());

  return (
    <div className={`${styles.panel} ${extraClass}`} {...props}>
      <Input extraClass={styles.panel__input} placeholder="Введите значение" />
      <Button text="Добавить в head" extraClass={styles.panel__btn} />
      <Button text="Добавить в tail" extraClass={styles.panel__btn} />
      <Button text="Удалить из head" onClick={handleRemoveFromHead} extraClass={styles.panel__btn} />
      <Button text="Удалить из tail" onClick={handleRemoveFromTail} extraClass={styles.panel__btn} />
    </div>
  );
};
