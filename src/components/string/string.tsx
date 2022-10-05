import React from "react";
import styles from './string.module.css';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {


  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input isLimitText />
        <Button text="Развернуть" />
      </form>
      <ul className={styles.list}>
        <li>
          <Circle />
        </li>
        <li>
          <Circle />
        </li>
        <li>
          <Circle />
        </li>
        <li>
          <Circle />
        </li>
      </ul>
    </SolutionLayout>
  );
};
