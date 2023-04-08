import { Col, Row } from 'antd';

import logo from './../../assets/logo.png';

import NavMenu from '@/components/NavMenu';
import Notifications from '@/components/Notifications';

interface AppHeaderProps {
  setCollapsed: Function;
  collapsed: boolean;
}

function AppHeader({ setCollapsed, collapsed }: AppHeaderProps) {
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
        span={17}
        style={{
          height: '73%',
        }}
      >
        <NavMenu />
      </Col>
      <Col
        span={4}
        style={{
          height: '73%',
        }}
      >
        <Notifications collapsed={collapsed} setCollapsed={setCollapsed} />
      </Col>
    </Row>
  );
}

export default AppHeader;
