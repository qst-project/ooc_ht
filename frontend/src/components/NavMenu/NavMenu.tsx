import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import styles from './NavMenu.module.scss';

import { MAIN_PAGE_ROUTE, MY_TASKS_PAGE_ROUTE, SECOND_PAGE_ROUTE } from '@/consts';

const menuItems = [
  {
    key: '1',
    label: <Link to={MAIN_PAGE_ROUTE}>Реестр</Link>,
    pathname: MAIN_PAGE_ROUTE,
  },
  {
    key: '2',
    label: <Link to={MY_TASKS_PAGE_ROUTE}>Мои задачи</Link>,
    pathname: MY_TASKS_PAGE_ROUTE,
  },
  {
    key: '3',
    label: <Link to={SECOND_PAGE_ROUTE}>Текущая повестка</Link>,
    pathname: SECOND_PAGE_ROUTE,
  },
];

function NavMenu() {
  const location = useLocation();
  let selectedKeys = '';
  switch (location.pathname) {
    case MAIN_PAGE_ROUTE:
      selectedKeys = '1';
      break;
    case MY_TASKS_PAGE_ROUTE:
      selectedKeys = '2';
      break;
    default:
      selectedKeys = '';
  }

  return (
    <Menu
    className={styles.nav_menu}
      mode='horizontal'
      style={{
        height: '100%',
        background: 'none',
        border: 'none',
      }}
      defaultSelectedKeys={[selectedKeys]}
      items={menuItems}
    />
  );
}

export default NavMenu;
