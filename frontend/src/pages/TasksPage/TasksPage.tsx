import { useEffect } from 'react';

import { useAppDispatch } from '@/store';
import { fetchTasks } from '@/store/actions/tasks';

function TasksPage() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTasks());
    }, []);
    return (
        <div>

        </div>
    );
}

export default TasksPage;