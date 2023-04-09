import { useState } from 'react';
import { Typography } from 'antd';

import ReplyInput from '@/components/ReplyInput';
import CreateTask from '@/components/CreateTask';


function CommentInput({ buildingId }: any) {
    const [openCreateTask, setCreateTask] = useState(false);
    const [modeCreateTask, setModeCreateTask] = useState(false);

    return (
        <>
            <Typography.Text>Оставить новый комментарий</Typography.Text>
            <ReplyInput
                buildingId={buildingId}
                modeCreateTask={modeCreateTask}
                openCreateTask={openCreateTask}
                setCreateTask={setCreateTask}
            />
            <CreateTask
                modeCreateTask={modeCreateTask}
                setModeCreateTask={setModeCreateTask}
            />
        </>
    );
}

export default CommentInput;