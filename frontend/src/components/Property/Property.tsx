import React from 'react';
import { Form, Input, Select } from 'antd';

import styles from './Property.module.scss';
import { PropertyProps } from './Property.types';

import { PropertyType } from '@/consts';
import { useAppSelector } from '@/store';

function Property({ name, label, type, options, value }: PropertyProps) {
    const isEdit = useAppSelector(state => state.buildingReducer.isEdit);

    const getPropertyElement = () => {
        if (!isEdit) {
            return value;
        }
        switch (type) {
            case PropertyType.TEXT:
                return (
                    <Input />
                );
            case PropertyType.SELECT:
                return (
                    <Select
                        options={options?.map(option => ({
                            value: option,
                            label: option,
                        }))}
                    />
                );
        }
    };

    return (
        <Form.Item
            label={label}
            name={name}
            className={styles.main}
            initialValue={value}
            rules={isEdit ? [{ required: true, message: 'Обязательное поле!' }] : []}
        >
            {getPropertyElement()}
        </Form.Item>
    );
}

export default Property;
