import React from 'react';
import styles from './BuildingPage.module.scss';
import BuildingInfo from '@/modules/BuildingInfo';

function BuildingPage() {
  return (
    <div className={styles.main}>
      <BuildingInfo />
    </div>
  );
}

export default BuildingPage;
