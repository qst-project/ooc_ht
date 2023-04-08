import React from 'react';

import styles from './MainProperties.module.scss';

import Property from '@/components/Property';

function MainProperties() {
    return (
        <div className={styles.main}>
            <Property name='county' label='Округ' type='select' />
            <Property name='area' label='Район' type='select' />
            <Property name='address' label='Адрес' type='text' />
            <Property name='objectType' label='Тип объекта' type='text' />
            <Property name='objectState' label='Состояние объекта' type='text' />
            <Property name='objectSquare' label='Площадь объекта' type='text' />
            <Property name='owner' label='Собственник' type='text' />
            <Property name='actualUser' label='Фактический пользователь' type='text' />
        </div>
    );
}

export default MainProperties;
