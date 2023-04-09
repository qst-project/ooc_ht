import React from 'react';

import { Card } from 'antd';

import styles from './Parley.module.scss';


import ParleyProperties from '@/components/ParleyProperties';
import CommentsAndTasks from '@/modules/CommentsAndTasks';

function Parley() {
    return (
        <Card
            title='Заброшенное здание №10'
            className={styles.main}
            headStyle={{ fontSize: '32px', padding: '32px 48px' }}
            bodyStyle={{ padding: '48px' }}
        >
            <div className={styles.top}>
                <ParleyProperties />
                <img
                    className={styles.cover}
                    src='https://www.tiafotc.org/wp-content/uploads/2020/07/CLTHQ_ArticleImage_1200x630.jpg'
                    alt='parley cover'
                />
            </div>
            <div className={styles.descr}>
                <h3 className={styles['descr-title']}>Необходимо вынести мусор на объектах 1234</h3>
                <p>Описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание </p>
            </div>

            <CommentsAndTasks buildingId={1} />
        </Card>
    );
}

export default Parley;
