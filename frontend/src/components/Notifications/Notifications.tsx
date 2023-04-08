import { Row, Space, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';

import { Colors } from '@/consts';

function Notifications() {
    return (
        <Row align={'middle'}>
            <Space>
                <BellOutlined style={{
                    color: Colors.PRIMARY,
                    fontSize: '35px',
                }} />
                <Typography.Text style={{ fontSize: '24px' }}>Уведомления</Typography.Text>
            </Space>
        </Row>

    );
}

export default Notifications;