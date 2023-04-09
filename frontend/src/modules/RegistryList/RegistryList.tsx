import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, InputRef, Row, Space, Table, Upload, UploadProps, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ColumnType, FilterConfirmProps, FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';

import { IBuildingData } from '@/consts';
import { useAppDispatch, useAppSelector } from '@/store';

import { exportXMLs, fetchBuildings, importXML } from '@/store/actions';

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue | null>;
}

type DataIndex = keyof IBuildingData;

function NewRegistryListModule() {
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const navigate = useNavigate();
    const searchInput = useRef<InputRef>(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const onSelectChange = (newSelectedRowKeys: any) => {
        console.log(newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IBuildingData> => ({
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

    const columns: ColumnsType<IBuildingData> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            render: (name) => name,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Округ',
            dataIndex: 'county',
            key: 'county',
            width: '15%',
            render: (county) => county,
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
            render: (district) => district,
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
            dataIndex: 'address',
            key: 'address',
            render: (address) => address,
            width: '15%',
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            render: (type) => type,
            width: '15%',
            sorter: true,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => status,
            width: '15%',
            sorter: true,
        },
    ];
    const [searchParams] = useSearchParams();
    const buildings = useAppSelector(state => state.buildingReducer.buildins);
    const loading = useAppSelector(state => state.buildingReducer.isLoading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchBuildings(''));
    }, []);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<IBuildingData>,
    ) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        const name = searchParams.get('name');
        const address = searchParams.get('address');
        const county = searchParams.get('county');
        const district = searchParams.get('district');
        let sort = '';
        let nameFilter = '';
        let addressFilter = '';
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
        if (address) {
            addressFilter = '&address=' + addressFilter;
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
        if (filters.address) {
            addressFilter = `&address=${filters.address[0]}`;
        }
        if (filters.county) {
            countyFilter = `&county=${filters.county.map(county => `${county}`)}`;
        }
        if (filters.district) {
            districtFilter = `&district=${filters.district.map(discrict => `${discrict}`)}`;
        }
        navigate('?' + sort + nameFilter + addressFilter + countyFilter + districtFilter);
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            // setData([]);
        }
    };

    const props: UploadProps = {
        name: 'file',
        action: 'http://localhost:9090/buildings/import',
        headers: {
            authorization: 'Basic dXNlcjp1c2Vy',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} файл успешно загружен`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} ошибка загрузки файла.`);
            }
        },
    };

    return (
        <Space direction={'vertical'} style={{ width: '100%' }}>
            <Table
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
                columns={columns}
                loading={loading}
                pagination={tableParams.pagination}
                dataSource={buildings}
                onChange={handleTableChange}
            />
            <Row justify={'start'}>
                <Button
                    type='primary'
                    style={{ marginRight: '10px' }}
                    onClick={() => navigate('/new_building')}
                >
                    Добавить новый объект
                </Button>
                <Button
                    type='primary'
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                        if (selectedRowKeys.length !== 0) {
                            dispatch(exportXMLs(selectedRowKeys));
                        }
                    }}
                >
                    Экспортировать в xml
                </Button>
                <Upload
                    {...props}
                >
                    <Button
                        type='primary'
                    >
                        Импортировать xml
                    </Button>
                </Upload>
            </Row>
        </Space>
    );
}

export default NewRegistryListModule;