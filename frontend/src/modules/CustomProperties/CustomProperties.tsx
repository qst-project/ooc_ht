import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';

import { getSchemasByGroup } from './helpers';
import { ICustomPropertySchema } from './customPropertiesSchema';
import styles from './CustomProperties.module.scss';

import Property from '@/components/Property';

import CreatePropertyModal from '@/components/CreatePropertyModal';
import { useAppDispatch, useAppSelector } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';

function CustomProperties() {
    const buildingData = useAppSelector(state => state.buildingReducer.buildingData);
    const groups = useAppSelector(state => state.buildingReducer.groups);
    const isEdit = useAppSelector(state => state.buildingReducer.isEdit);
    const { setGroups } = buildingSlice.actions;
    const dispatch = useAppDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const groupsSet = new Set<string>();
        if (!buildingData) return;
        buildingData.customProperties.forEach(schema => {
            if (schema.group) groupsSet.add(schema.group);
        });
        dispatch(setGroups([...groupsSet]));
    }, [buildingData]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addProperty = (schema: ICustomPropertySchema) => {
        dispatch(buildingSlice.actions.addProperty(schema));
        closeModal();
    };

    if (!buildingData) return null;

    return (
        <div className={styles.main}>
            <div className={styles.properties}>
                {groups.map(group => (
                    <Card key={group} title={group} className={styles.group}>
                        {getSchemasByGroup(buildingData.customProperties, group).map(schema => (
                            <Property
                                label={schema.label}
                                name={schema.name}
                                type={schema.type}
                                options={schema.options}
                                key={schema.label}
                                value={schema.value}
                            />
                        ))}
                    </Card>
                ))}
            </div>
            {isEdit && (
                <div className={styles['add-section']}>
                    <Button
                        type='primary'
                        onClick={openModal}
                        block icon={<PlusOutlined/>}
                        size='large'
                        style={{ width: 'auto' }}
                    >
                        Добавить поле
                    </Button>
                    <CreatePropertyModal
                        isOpen={isModalOpen}
                        onOk={addProperty}
                        onCancel={closeModal}
                    />
                </div>
            )}
        </div>
    );
}

export default CustomProperties;
