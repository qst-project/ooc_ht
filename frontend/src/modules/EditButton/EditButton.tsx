import React from 'react';

import { Button } from 'antd';

import styles from './EditButton.module.scss';


import { useAppDispatch, useAppSelector } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';

function EditButton() {
    const isEdit = useAppSelector(state => state.buildingReducer.isEdit);
    const isNew = useAppSelector(state => state.buildingReducer.isNew);
    const dispatch = useAppDispatch();

    const toggleIsEdit = () => {
        dispatch(buildingSlice.actions.setIsEdit(!isEdit));
    };

    if (isNew) return null;

    return (
        <div className={styles.main}>
            <Button
                size='large'
                type='primary'
                onClick={toggleIsEdit}
            >
                {isEdit ? 'Режим просмотра' : 'Режим редактирования'}
            </Button>
        </div>
    );
}

export default EditButton;
