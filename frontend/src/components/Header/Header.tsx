import { Col, Row, Typography } from 'antd';

import logo from './../../assets/logo.png';

import NavMenu from '@/components/NavMenu';

function AppHeader() {
  return (
    <Row
      justify='space-around'
      align='middle'
      style={{
        height: '100px',
      }}
    >
      <Col span={3}
        style={{
          paddingLeft: '100px',
        }
        }>
        <img
          src={logo}
          alt='логотип'
          width='100px'
          height='100px'
        />
      </Col>
      <Col
        span={19}
        style={{
          height: '73%',
        }}
      >
        <NavMenu />
      </Col>
      <Col
        span={2}
        style={{
          height: '73%',
        }}
      >
        <Typography.Text>
          Уведомления
        </Typography.Text>
      </Col>
    </Row>
  );
}

export default AppHeader;
