import { useEffect, useCallback, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, InputRef, Modal, Row, Space, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnType, FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';

import AddNewObject from '@/components/AddNewObject';
// import { fetchBuildings } from '@/store/actions';
// import { useAppDispatch } from '@/store';

interface DataType {
    key: string;
    name: string;
    county: string;
    address: string;
    district: string;
    type: string;
    status: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue | null>;
}

type DataIndex = keyof DataType;

function RegistryListModule() {
    // const dispatch = useAppDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const searchInput = useRef<InputRef>(null);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Найти по ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Найти
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: () => 'mock',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Округ',
            dataIndex: 'county',
            key: 'county',
            width: '15%',
            render: () => 'mock',
            filters: [
                {
                    text: 'Северный',
                    value: '1',
                },
                {
                    text: 'Западный',
                    value: '2',
                },
            ],
            //   onFilter: (value: string | number | boolean, record) => record.name.indexOf(value as string) === 0,
        },
        {
            title: 'Район',
            dataIndex: 'district',
            key: 'district',
            render: () => 'mock',
            width: '15%',
            filters: [
                {
                    text: 'Первомайский',
                    value: '1',
                },
                {
                    text: 'Фрунзеский',
                    value: '2',
                },
            ],
            //   onFilter: (value: string | number | boolean, record) => record.name.indexOf(value as string) === 0,
        },
        {
            title: 'Адрес',
            dataIndex: 'adress',
            key: 'adress',
            render: () => 'mock',
            width: '15%',
            ...getColumnSearchProps('address'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            render: () => 'mock',
            width: '15%',
            sorter: true,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: () => 'mock',
            width: '15%',
            sorter: true,
        },
    ];

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<DataType>,
    ) => {
        console.log(sorter);
        console.log(filters);
        console.log(tableParams);
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const name = searchParams.get('name');
        const adress = searchParams.get('adress');
        const county = searchParams.get('county');
        const district = searchParams.get('district');
        let sort = '';
        let nameFilter = '';
        let adressFilter = '';
        let countyFilter = '';
        let districtFilter = '';
        if (status) {
            sort = '&status=' + status;
        }
        if (type) {
            sort = '&type=' + type;
        }
        if (name) {
            nameFilter = '&name=' + name;
        }
        if (adress) {
            adressFilter = '&adress=' + adressFilter;
        }
        if (county) {
            countyFilter = '&county=' + county;
        }
        if (district) {
            districtFilter = '&district=' + district;
        }
        if (sorter.order) {
            sort = `${sorter.columnKey}=${sorter.order}`;
        }
        if (filters.name) {
            nameFilter = `&name=${filters.name[0]}`;
        }
        if (filters.adress) {
            adressFilter = `&adress=${filters.adress[0]}`;
        }
        if (filters.county) {
            countyFilter = `&county=${filters.county.map(county => `${county}`)}`;
        }
        if (filters.district) {
            districtFilter = `&district=${filters.district.map(discrict => `${discrict}`)}`;
        }
        navigate('?' + sort + nameFilter + adressFilter + countyFilter + districtFilter);
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const fetchData = useCallback(() => {
        // setLoading(true);
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
        // dispatch(fetchBuildings(''));
    }, []);

    return (
        <Space direction={'vertical'} style={{ width: '100%' }}>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                loading={loading}
                pagination={tableParams.pagination}
                dataSource={data}
                onChange={handleTableChange}
            />
            <Row justify={'start'}>
                <Button
                    type='primary'
                    onClick={start}
                    disabled={!hasSelected}
                    loading={loading}
                    style={{ marginRight: '10px' }}
                >
                    Сбросить
                </Button>
                <Button type='primary' style={{ marginRight: '10px' }} onClick={() => setOpen(true)}>
                    Добавить новый объект
                </Button>
                <Button type='primary' onClick={() => setOpen(true)}>
                    Экспортировать в xml
                </Button>
            </Row>
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