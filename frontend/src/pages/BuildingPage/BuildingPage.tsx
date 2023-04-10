import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import styles from './BuildingPage.module.scss';

import BuildingInfo from '@/modules/BuildingInfo';
import CommentsAndTasks from '@/modules/CommentsAndTasks';


import { useAppDispatch, useAppSelector } from '@/store';
import { fetchBuilding } from '@/store/actions';
import Loading from '@/components/Loading';
import { commentsSlice } from '@/store/slices/CommentsSlice';

function BuildingPage() {
    const isLoading = useAppSelector(state => state.buildingReducer.isLoading);
    const dispatch = useAppDispatch();
    const { id: buildingId } = useParams<{ id?: string }>();

    useEffect(() => {
        dispatch(commentsSlice.actions.setIsParley(false));
    }, []);

    useEffect(() => {
        dispatch(fetchBuilding(Number(buildingId)));
    }, [buildingId]);

    if (isLoading) return (
        <Loading />
    );

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
