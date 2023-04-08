import { Steps } from 'antd';

import styles from './TaskList.module.scss';
import { TaskListProps } from './TaskList.types';


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
