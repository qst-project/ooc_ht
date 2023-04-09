import React from 'react';

import styles from './MainProperties.module.scss';

import Property from '@/components/Property';
import { PropertyType } from '@/consts';
import { useAppSelector } from '@/store';

function MainProperties() {
    const buildingData = useAppSelector(state => state.buildingReducer.buildingData);

    if (!buildingData) return null;

    return (
        <div className={styles.main}>
            <Property name='county' label='Округ' type={PropertyType.TEXT} value={buildingData.county} />
            <Property name='district' label='Район' type={PropertyType.TEXT} value={buildingData.district} />
            <Property name='address' label='Адрес' type={PropertyType.TEXT} value={buildingData.address} />
            <Property name='type' label='Тип объекта' type={PropertyType.TEXT} value={buildingData.type} />
            <Property name='condition' label='Состояние объекта' type={PropertyType.TEXT} value={buildingData.condition} />
            <Property name='area' label='Площадь объекта' type={PropertyType.TEXT} value={buildingData.area} />
            <Property name='owner' label='Собственник' type={PropertyType.TEXT} value={buildingData.owner} />
            <Property name='fact_owner' label='Фактический пользователь' type={PropertyType.TEXT} value={buildingData.fact_owner} />
        </div>
    );
}

export default MainProperties;
