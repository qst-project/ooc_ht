import React from 'react';
import { Form, Input, Select } from 'antd';

import styles from './Property.module.scss';
import { PropertyProps } from './Property.types';

import { PropertyType } from '@/consts';

function Property({ name, label, type, options }: PropertyProps) {
    const getPropertyElement = () => {
        switch (type) {
            case PropertyType.TEXT:
                return (
                    <Input/>
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
        >
            {getPropertyElement()}
        </Form.Item>
    );
}

export default Property;
