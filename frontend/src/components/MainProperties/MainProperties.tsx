import React from 'react';

import styles from './MainProperties.module.scss';

import Property from '@/components/Property';
import { PropertyType } from '@/consts';

function MainProperties() {
    return (
        <div className={styles.main}>
            <Property name='county' label='Округ' type={PropertyType.SELECT} />
            <Property name='area' label='Район' type={PropertyType.SELECT} />
            <Property name='address' label='Адрес' type={PropertyType.TEXT} />
            <Property name='objectType' label='Тип объекта' type={PropertyType.TEXT} />
            <Property name='objectState' label='Состояние объекта' type={PropertyType.TEXT} />
            <Property name='objectSquare' label='Площадь объекта' type={PropertyType.TEXT} />
            <Property name='owner' label='Собственник' type={PropertyType.TEXT} />
            <Property name='actualUser' label='Фактический пользователь' type={PropertyType.TEXT} />
        </div>
    );
}

export default MainProperties;
