import React from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ValueControlPanel } from './components/value-control-panel/value-control-panel';
import { IndexControlPanel } from './components/index-control-panel/index-control-panel';

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controls}>
        <ValueControlPanel />
        <IndexControlPanel />
      </div>
      <ul className={styles.list}>
        <li>1</li>
      </ul>
    </SolutionLayout>
  );
};
