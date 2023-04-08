import styles from './MainPage.module.scss';

import RegistryListModule from '@/modules/RegistryList';

function RegistryListPage() {
  return (
    <div className={styles.mainpage}>
        <RegistryListModule />
    </div>
  );
}

export default RegistryListPage;
