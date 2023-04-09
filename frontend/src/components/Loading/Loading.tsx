import React from 'react';

import { Spin } from 'antd';

import styles from './Loading.module.scss';

function Loading() {
    return (
        <div className={styles.main}>
            <Spin />
        </div>
    );
}

export default Loading;
