import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { fetchTasks } from '@/store/actions';
import TaskItem from '@/components/TaskItem';
// import TaskItem from '@/components/TaskItem';

interface TaskListProps {
    buildingId: number;
}

function TaskList({ buildingId }: TaskListProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTasks(Number(buildingId)));
    }, [buildingId]);
    const tasks = useAppSelector(state => state.commentsReducer.tasks);
    console.log(tasks);
    return (
        <>
        {
            tasks.map(task => (
                <TaskItem task={task}/>
            ))
        }
        </>
        // <TaskItem />
    );
}

export default TaskList;