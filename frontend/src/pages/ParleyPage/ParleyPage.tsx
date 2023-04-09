import React, { useEffect } from 'react';

import styles from './ParleyPage.module.scss';

import Parley from '@/modules/Parley';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchParleyTasks } from '@/store/actions';
import Loading from '@/components/Loading';

function ParleyPage() {
    const tasksData = useAppSelector(state => state.parleyReducer.tasks);
    const dispatch = useAppDispatch();
    console.log(tasksData);

    useEffect(() => {
        dispatch(fetchParleyTasks());
    }, []);

    if (!tasksData) return <Loading />;

    return (
        <div className={styles.main}>
            <div className='container'>
                {Object.entries(tasksData).map(([buildingId, tasks]) => (
                    <Parley key={buildingId} tasks={tasks} buildingId={Number(buildingId)} />
                ))}
            </div>
        </div>
    );
}

export default ParleyPage;
