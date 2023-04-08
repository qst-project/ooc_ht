import React from 'react';

import styles from './NewBuildingPage.module.scss';

import BuildingInfo from '@/modules/BuildingInfo';

function BuildingPage() {
    return (
        <div className={styles.main}>
            <div className='container'>
                <BuildingInfo />
            </div>
        </div>
    );
}

export default BuildingPage;
