import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import styles from './BuildingPage.module.scss';

import BuildingInfo from '@/modules/BuildingInfo';
import CommentsAndTasks from '@/modules/CommentsAndTasks';


import { useAppDispatch } from '@/store';
import { fetchBuilding } from '@/store/actions';

function BuildingPage() {
    const dispatch = useAppDispatch();
    const { id: buildingId } = useParams<{ id?: string }>();

    useEffect(() => {
        dispatch(fetchBuilding(Number(buildingId)));
    }, [buildingId]);

    if (!buildingId) return null;

    return (
        <div className={styles.main}>
            <div className='container'>
                <BuildingInfo />
                <CommentsAndTasks buildingId={Number(buildingId)} />
            </div>
        </div>
    );
}

export default BuildingPage;
