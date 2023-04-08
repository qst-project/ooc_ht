import { useCallback, useEffect, useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

import AddNewObject from '@/components/AddNewObject';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue | null>;
}

function RegistryListModule() {
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            sorter: true,
            render: (name) => `${name.first} ${name.last}`,
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'Округ',
            dataIndex: 'phone',
            key: 'phone',
            width: '15%',
            render: (phone) => `${phone}`,
            // ...getColumnSearchProps('age'),
        },
        {
            title: 'Район',
            dataIndex: 'location',
            key: 'location',
            render: (location) => `${location.state}`,
            width: '15%',
            // ...getColumnSearchProps('address'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Адресс',
            dataIndex: 'location',
            key: 'location',
            render: (location) => `${location.state}`,
            width: '15%',
            // ...getColumnSearchProps('address'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Тип',
            dataIndex: 'location',
            key: 'location',
            render: (location) => `${location.state}`,
            width: '15%',
            // ...getColumnSearchProps('address'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Статус',
            dataIndex: 'location',
            key: 'location',
            render: (location) => `${location.state}`,
            width: '15%',
            // ...getColumnSearchProps('address'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
    ];

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<DataType>,
    ) => {
        console.log(sorter);
        console.log(filters);
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch('https://randomuser.me/api?results=20')
            .then((res) => res.json())
            .then(({ results }) => {
                console.log(results);
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 20,
                        // data.totalCount
                    },
                });
            });
    }, [tableParams]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Space direction={'vertical'} style={{width: '100%'}}>
            <Table
                columns={columns}
                loading={loading}
                pagination={tableParams.pagination}
                dataSource={data}
                onChange={handleTableChange}
            />
            <Button type='primary' onClick={() => setOpen(true)}>
                Добавить новый объект
            </Button>
            <Modal
                title={'Создание нового объекта'}
                centered
                open={open}
                onCancel={() => setOpen(false)}
                footer={[]}
            >
                <AddNewObject />
            </Modal>
        </Space>
    );
}

export default RegistryListModule;