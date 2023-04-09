import React from 'react';

import styles from './ParleyProperties.module.scss';

function ParleyProperties() {
    return (
        <div className={styles.main}>
            <div className={styles.props}>
                <p className={styles.prop}>Округ</p>
                <p className={styles.value}>ЗАО</p>
            </div>
            <div className={styles.props}>
                <p className={styles.prop}>Район</p>
                <p className={styles.value}>Можайский</p>
            </div>
            <div className={styles.props}>
                <p className={styles.prop}>Адрес</p>
                <p className={styles.value}>г. Москва, ул. Кузнецова, дом 3А</p>
            </div>
            <div className={styles.props}>
                <p className={styles.prop}>Площадь</p>
                <p className={styles.value}>5184.50</p>
            </div>
        </div>
    );
}

export default ParleyProperties;
