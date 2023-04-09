import React from 'react';

import { Form, Input } from 'antd';

import styles from './BuildingTitle.module.scss';

import { BuildingTitleProps } from './BuildingTitle.types';

import { useAppSelector } from '@/store';


function BuildingTitle({ title }: BuildingTitleProps) {
    const isEdit = useAppSelector(state => state.buildingReducer.isEdit);

    return (
        <Form.Item
            name='name'
            initialValue={title}
            rules={isEdit ? [{ required: true, message: 'Обязательное поле!' }] : []}
        >
            {isEdit
                ? <Input className={styles.title} placeholder='Название объекта'/>
                : <h1 className={`${styles.title} ${styles.input}`}>{title}</h1>
            }
        </Form.Item>
    );
}

export default BuildingTitle;
