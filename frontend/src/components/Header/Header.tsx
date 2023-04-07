import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';

interface HeaderProps {
  setCollapsed: Function;
  collapsed: boolean;
}

function AppHeader({ setCollapsed, collapsed }: HeaderProps) {
  return (
    <Row
      justify='space-around'
      align='middle'
    >
      <Col span={22}>
        {
          React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })
        }
      </Col>
    </Row>
  );
}

export default AppHeader;
