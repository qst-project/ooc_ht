import React, { useEffect, useState } from 'react';

import { Card } from 'antd';

import styles from './Parley.module.scss';


import ParleyProperties from '@/components/ParleyProperties';
import CommentsAndTasks from '@/modules/CommentsAndTasks';
import { ParleyProps } from '@/modules/Parley/Parley.types';
import { API_URL, IBuildingData, IBuildingDataBack } from '@/consts';
import { axiosInstance } from '@/api';
import { parseBuildingDataFromBack } from '@/utils/parsers';

function Parley({ tasks, buildingId }: ParleyProps) {
    const [buildingData, setBuildingData] = useState<IBuildingData>();
    console.log(buildingData);

    useEffect(() => {
        axiosInstance.get<IBuildingDataBack>(`${API_URL}/building/${buildingId}`).then(res => {
            const _buildingData = parseBuildingDataFromBack(res.data);
            setBuildingData(_buildingData);
        });
    }, []);

    if (!buildingData) return null;

    return (
        <Card
            title={buildingData.name}
            className={styles.main}
            headStyle={{ fontSize: '32px', padding: '32px 48px' }}
            bodyStyle={{ padding: '48px' }}
        >
            <div className={styles.top}>
                <ParleyProperties buildingData={buildingData} />
                <img
                    className={styles.cover}
                    src='https://www.tiafotc.org/wp-content/uploads/2020/07/CLTHQ_ArticleImage_1200x630.jpg'
                    alt='parley cover'
                />
            </div>
            <div className={styles.descr}>
                <h3 className={styles['descr-title']}>{buildingData.name}</h3>
                <p>{buildingData.description}</p>
            </div>

            <CommentsAndTasks buildingId={buildingId} isParley={true} />
        </Card>
    );
}

export default Parley;
