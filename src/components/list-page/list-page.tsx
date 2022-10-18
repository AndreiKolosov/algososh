import React from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ValueControlPanel } from './components/value-control-panel/value-control-panel';
import { IndexControlPanel } from './components/index-control-panel/index-control-panel';
import { Circle } from '../ui/circle/circle';

export const ListPage: React.FC = () => {
  
 

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controls}>
        <ValueControlPanel />
        <IndexControlPanel />
      </div>
      <ul className={styles.list}>
        {/* {linkedList.map((item) => (
          <li key={item.index}>
            <Circle
              letter={item.value}
              head={checkListItemHead(item.head)}
              tail={item.tail ? 'tail' : ''}
              index={item.index}
              extraClass={item.extraClass ? styles[`circle_${item.extraClassModifier}`] : ''}
            />
          </li>
        ))} */}
      </ul>
    </SolutionLayout>
  );
};
