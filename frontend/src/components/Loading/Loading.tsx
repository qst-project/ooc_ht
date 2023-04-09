import React from 'react';
import styles from './Loading.module.scss';
import { Spin } from 'antd';

function Loading() {
    return (
        <div className={styles.main}>
            <Spin />
        </div>
    );
}

export default Loading;
