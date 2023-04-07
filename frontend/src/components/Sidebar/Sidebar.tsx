import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';

import { MAIN_PAGE_ROUTE, SECOND_PAGE_ROUTE } from '@/consts';

interface SidebarProps {
  collapsed: boolean;
}

const menuItems = [
  {
    key: '1',
    label: <Link to={MAIN_PAGE_ROUTE}>Главная</Link>,
    pathname: MAIN_PAGE_ROUTE,
    icon: <HomeOutlined />,
  },
  {
    key: '2',
    label: <Link to={SECOND_PAGE_ROUTE}>Вторая</Link>,
    pathname: SECOND_PAGE_ROUTE,
    icon: <ReadOutlined />,
  },
];

function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  let selectedKeys = '1';
  switch (location.pathname) {
    case MAIN_PAGE_ROUTE:
      selectedKeys = '1';
      break;
    case SECOND_PAGE_ROUTE:
      selectedKeys = '2';
      break;
    default:
      selectedKeys = '1';
  }

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ height: '100%' }}
    >
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[selectedKeys]}
        items={menuItems}
      />
    </Layout.Sider>
  );
}

export default Sidebar;
