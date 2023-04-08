import React from 'react';
import { Form, Input } from 'antd';

import styles from './Property.module.scss';
import { PropertyProps } from './Property.types';


function Property({ name, label, type }: PropertyProps) {
    return (
        <Form.Item
            label={label}
            name={name}
            className={styles.main}
        >
            <Input
                type={type}
            />
        </Form.Item>
    );
}

export default Property;
