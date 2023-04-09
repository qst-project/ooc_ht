import React from 'react';

import { Form, Input } from 'antd';

import styles from './BuildingDescription.module.scss';
import { BuildingDescriptionProps } from './BuildingDescription.types';

import { useAppSelector } from '@/store';

const { TextArea } = Input;

function BuildingDescription({ text }: BuildingDescriptionProps) {
    const isEdit = useAppSelector(state => state.buildingReducer.isEdit);

    return (
        <Form.Item
            name='description'
            initialValue={text}
            rules={isEdit ? [{ required: true, message: 'Обязательное поле!' }] : []}
            className={styles.main}
        >
            <h2 className={styles['descr-title']}>Описание:</h2>
            {isEdit
                ? <TextArea rows={4} placeholder='Описание объекта' />
                : <p className={styles.descr}>{text}</p>
            }
        </Form.Item>
    );
}

export default BuildingDescription;
