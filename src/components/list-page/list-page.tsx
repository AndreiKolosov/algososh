import React, { useEffect } from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ValueControlPanel } from './components/value-control-panel/value-control-panel';
import { IndexControlPanel } from './components/index-control-panel/index-control-panel';
import { Circle } from '../ui/circle/circle';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { initList } from '../../services/slices/linkedListSlice';

export const ListPage: React.FC = () => {
  const { linkedList } = useAppSelector((store) => store.linkedList)
  const dispatch = useAppDispatch();
  
  //  вынести в utils
  const checkListItemHead = (head: string) => {
    if (head === 'head') return 'head';
    if (head === '') return '';
    return <Circle letter={head} isSmall />;
  }
  
  useEffect(() => {
    dispatch(initList(['0', '34', '8', '1']))
  }, [dispatch])

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.controls}>
        <ValueControlPanel />
        <IndexControlPanel />
      </div>
      <ul className={styles.list}>
        {linkedList.map((item) => (
          <li key={item.index}>
            <Circle
              letter={item.value}
              head={checkListItemHead(item.head)}
              tail={item.tail ? 'tail' : ''}
              index={item.index}
              extraClass={item.extraClass ? styles[`circle_${item.extraClassModifier}`] : ''}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
