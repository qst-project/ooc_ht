import React from 'react';

import styles from './ParleyProperties.module.scss';

import { ParleyPropertiesProps } from '@/components/ParleyProperties/ParleyProperties.types';

function ParleyProperties({ buildingData }: ParleyPropertiesProps) {
    return (
        <div className={styles.main}>
            <div className={styles.props}>
                <p className={styles.prop}>Округ</p>
                <p className={styles.value}>{buildingData.county}</p>
            </div>
            <div className={styles.props}>
                <p className={styles.prop}>Район</p>
                <p className={styles.value}>{buildingData.district}</p>
            </div>
            <div className={styles.props}>
                <p className={styles.prop}>Адрес</p>
                <p className={styles.value}>{buildingData.address}</p>
            </div>
            <div className={styles.props}>
                <p className={styles.prop}>Площадь</p>
                <p className={styles.value}>{buildingData.area}</p>
            </div>
        </div>
    );
}

export default ParleyProperties;
