import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';

import { getSchemasByGroup } from './helpers';
import { ICustomPropertySchema } from './customPropertiesSchema';
import styles from './CustomProperties.module.scss';

import Property from '@/components/Property';

import CreatePropertyModal from '@/components/CreatePropertyModal';

function CustomProperties() {
    const [schemas, setSchemas] = useState<ICustomPropertySchema[]>([]);
    const [groups, setGroups] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(groups);

    useEffect(() => {
        const groupsSet = new Set<string>();
        schemas.forEach(schema => {
            if (schema.group) groupsSet.add(schema.group);
        });
        setGroups([...groupsSet]);
    }, [schemas]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addProperty = (schema: ICustomPropertySchema) => {
        setSchemas(prev => [...prev, schema]);
        closeModal();
    };

    return (
        <div className={styles.main}>
            <div className={styles.properties}>
                {groups.map(group => (
                    <Card key={group} title={group} className={styles.group}>
                        {getSchemasByGroup(schemas, group).map(schema => (
                            <Property
                                label={schema.label}
                                name={schema.name}
                                type={schema.type}
                                options={schema.options}
                            />
                        ))}
                    </Card>
                ))}
            </div>
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
        </div>
    );
}

export default CustomProperties;
