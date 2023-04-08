import React from 'react';
import styles from './TaskList.module.scss';
import { TaskListProps } from './TaskList.types';
import { Steps } from 'antd';

function TaskList({ tasks }: TaskListProps) {
  return (
    <div className={styles.main}>
      <Steps
        size='default'
        current={2}
        items={tasks.map(task => ({
          title: task,
        }))}
      />
    </div>
  );
}

export default TaskList;
