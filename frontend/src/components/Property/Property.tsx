import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import styles from './Property.module.scss';
import { PropertyProps } from './Property.types';

import { PropertyType } from '@/consts';
import { useAppSelector } from '@/store';

function Property({ name, label, type, options, value, onRemove }: PropertyProps) {
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
            case PropertyType.NUMBER:
                return (
                    <Input type={PropertyType.NUMBER} />
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
        <div className={styles.main}>
            <Form.Item
                label={label}
                name={name}
                initialValue={value}
                rules={isEdit ? [{ required: true, message: 'Обязательное поле!' }] : []}
            >
                {getPropertyElement()}
            </Form.Item>
            {onRemove && isEdit && (
                <Button
                    type='dashed'
                    shape='circle'
                    icon={<CloseOutlined />}
                    onClick={() => onRemove(name)}
                />
            )}
        </div>
    );
}

export default Property;
