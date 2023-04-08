import { List } from 'antd';

import styles from './NotificationsList.module.scss';

function NotoficationsList() {
    return (
        <div className={styles.main}>
            <List dataSource={[]} />
        </div> 
    );
}

export default NotoficationsList;