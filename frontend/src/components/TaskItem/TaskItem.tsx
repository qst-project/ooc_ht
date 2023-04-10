import { Button, Card, Spin } from 'antd';
import { useEffect } from 'react';
import { saveAs} from 'file-saver';

import { ITaskItemData } from '@/consts';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFile } from '@/store/actions/tasks';


interface TaskItemProps {
    task: ITaskItemData
}

function TaskItem({ task }: TaskItemProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchFile(task.files));
    }, []);
    const loading = useAppSelector(state => state.taskReducer.isLoading);
    const file = useAppSelector(state => state.taskReducer.file);
    console.log(file);
    return (
        
        loading ? <Spin />
            : (
                <Card title={task.title}>
                    {task.about}
                    <Card.Meta description={`До ${task.deadline}`} />
                    <Button type='primary' onClick={() => {
                        var blob = new Blob([file], {type: 'text/plain;charset=utf-8'});
                         saveAs(blob, 'file.txt');
                    }}>Загрузить файлы</Button>
                </Card>)

    );
}

export default TaskItem;