import React from 'react';
import styles from './value-control-panel.module.css';
import { Button } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';

export const ValueControlPanel: React.FC<{ extraClass?: string }> = ({ extraClass = '', ...props }) => (
  <div className={`${styles.panel} ${extraClass}`} {...props}>
    <Input extraClass={styles.panel__input} placeholder="Введите значение" />
    <Button text="Добавить в head" extraClass={styles.panel__btn} />
    <Button text="Добавить в tail" extraClass={styles.panel__btn} />
    <Button text="Удалить из head" extraClass={styles.panel__btn} />
    <Button text="Удалить из tail" extraClass={styles.panel__btn} />
  </div>
);
