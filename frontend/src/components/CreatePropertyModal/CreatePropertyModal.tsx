import React, { useState } from 'react';
import { Button, Divider, Form, Input, Modal, Select, Space } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { CreatePropertyModalProps } from './CreatePropertyModal.types';

import styles from './CreatePropertyModal.module.scss';

import { PropertyType } from '@/consts';

import { ICustomPropertySchema } from '@/modules/CustomProperties/customPropertiesSchema';
import { useAppDispatch, useAppSelector } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';


const typeOptions = [
    {
        label: 'Текст',
        value: PropertyType.TEXT,
    },
    {
        label: 'Число',
        value: PropertyType.NUMBER,
    },
    {
        label: 'Селектор',
        value: PropertyType.SELECT,
    },
    {
        label: 'Дата',
        value: PropertyType.DATE,
    },
];

function CreatePropertyModal({ isOpen, onOk, onCancel }: CreatePropertyModalProps) {
    const groups = useAppSelector(state => state.buildingReducer.groups);
    const { setGroups } = buildingSlice.actions;
    const dispatch = useAppDispatch();

    const [selectedType, setSelectedType] = useState<PropertyType>();
    const [groupName, setGroupName] = useState('');
    const [form] = Form.useForm();

    const handleForm = (values: any) => {
        const schema: ICustomPropertySchema = {
            type: values.type,
            name: values.label,
            label: values.label,
            group: values.group,
        };
        if (values.options) {
            schema.options = values.options;
        }
        onOk(schema);
        form.resetFields();
    };

    const onGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(setGroups([...groups, groupName]));
        setGroupName('');
    };

    const isAddGroupButtonDisabled = () => {
        return !groupName || groups.includes(groupName);
    };

    return (
        <Modal
            title='Новое поле'
            open={isOpen}
            onCancel={onCancel}
            footer={[
                <Button
                    form='createNewProperty'
                    key='submit'
                    htmlType='submit'
                    type='primary'
                >
                    Добавить
                </Button>,
                <Button
                    onClick={onCancel}
                >
                    Отменить
                </Button>,
            ]}
            className={styles.main}
        >
            <Form
                form={form}
                name='createNewProperty'
                onFinish={handleForm}
            >
                <Form.Item
                    name='label'
                    label='Название'
                    rules={[{ required: true, message: 'Обязательное поле!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='type'
                    label='Тип'
                    rules={[{ required: true, message: 'Обязательное поле!' }]}
                >
                    <Select
                        options={typeOptions}
                        onSelect={(value) => setSelectedType(value)}
                    />
                </Form.Item>
                <Form.Item
                    name='group'
                    label='Группа'
                    rules={[{ required: true, message: 'Обязательное поле!' }]}
                >
                    <Select
                        placeholder='Выберите группу'
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <Space style={{ padding: '0 8px 4px' }}>
                                    <Input
                                        placeholder='Название группы'
                                        value={groupName}
                                        onChange={onGroupNameChange}
                                    />
                                    <Button
                                        type='text'
                                        icon={<PlusOutlined />}
                                        onClick={addItem}
                                        disabled={isAddGroupButtonDisabled()}
                                    >
                                        Добавить группу
                                    </Button>
                                </Space>
                            </>
                        )}
                        options={groups.map((group) => ({ label: group, value: group }))}
                    />
                </Form.Item>
                {(selectedType === PropertyType.SELECT) && (
                    <Form.Item
                        name='options'
                        label='Опции'
                        rules={[{ required: true, message: 'Обязательное поле!' }]}
                    >
                        <Select
                            mode='tags'
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
}

export default CreatePropertyModal;
