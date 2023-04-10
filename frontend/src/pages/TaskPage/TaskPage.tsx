import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store';
import { fetchTask } from '@/store/actions/tasks';
import TaskItem from '@/components/TaskItem';


function TaskPage() {
    const { taskId: taskId } = useParams<{ taskId?: string }>();
    const { buildingId: buildingId } = useParams<{ buildingId?: string }>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTask(Number(taskId), Number(buildingId)));
    }, [taskId, buildingId]);
    const task = useAppSelector(state => state.taskReducer.task);
    // const loading = useAppSelector(state => state.taskReducer.isLoading);
    return (
        !task.files
            ? <Spin /> : (<div>
                <TaskItem task={task} />
            </div>)

    );
}

export default TaskPage;