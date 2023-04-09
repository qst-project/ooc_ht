import React from 'react';
import styles from './EditButton.module.scss';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';

function EditButton() {
    const isEdit = useAppSelector(state => state.buildingReducer.isEdit);
    const dispatch = useAppDispatch();

    const toggleIsEdit = () => {
        dispatch(buildingSlice.actions.setIsEdit(!isEdit));
    };

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
