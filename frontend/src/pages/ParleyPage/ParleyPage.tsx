import React from 'react';

import styles from './ParleyPage.module.scss';

import Parley from '@/modules/Parley';

function ParleyPage() {
    return (
        <div className={styles.main}>
            <div className='container'>
                <Parley />
            </div>
        </div>
    );
}

export default ParleyPage;
