import React from 'react';

import styles from './BuildingPage.module.scss';

import BuildingInfo from '@/modules/BuildingInfo';
import CommentsAndTasks from '@/modules/CommentsAndTasks';

function BuildingPage() {
    return (
        <div className={styles.main}>
            <div className='container'>
                <BuildingInfo />
                <CommentsAndTasks />
            </div>
        </div>
    );
}

export default BuildingPage;
