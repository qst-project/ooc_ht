import React, { useEffect } from 'react';

import styles from './NewBuildingPage.module.scss';

import BuildingInfo from '@/modules/BuildingInfo';

import { useAppDispatch } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';
import { IBuildingData } from '@/consts';

function BuildingPage() {
    const dispatch = useAppDispatch();

    const buildingData: IBuildingData = {
        id: Date.now(),
        customProperties: [],
    };

    useEffect(() => {
        dispatch(buildingSlice.actions.setBuildingData(buildingData));
        dispatch(buildingSlice.actions.setIsEdit(true));
        dispatch(buildingSlice.actions.setIsNew(true));
    }, []);

    return (
        <div className={styles.main}>
            <div className='container'>
                <BuildingInfo />
            </div>
        </div>
    );
}

export default BuildingPage;
