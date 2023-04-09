import { Card } from 'antd';

import { ITaskItemData } from '@/consts';

interface TaskItemProps {
    task: ITaskItemData
}

function TaskItem({ task }: TaskItemProps) {
    return (
        <Card title={task.title}>
            {task.about}
            <Card.Meta description={`До ${task.deadline}`} />
        </Card>
    );
}

export default TaskItem;