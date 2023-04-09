import React from 'react';
import { Button, Form } from 'antd';

import styles from './BuildingInfo.module.scss';

import ImageList from '@/components/ImageList';

import MainProperties from '@/components/MainProperties';
import CustomProperties from '@/modules/CustomProperties';
import { useAppDispatch, useAppSelector } from '@/store';
import { postBuilding } from '@/store/actions/postBuilding';

function BuildingInfo() {
    const isEdit = useAppSelector(state => state.buildingReducer.isEdit);
    const buildingData = useAppSelector(state => state.buildingReducer.buildingData);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const handleForm = (values: any) => {
        if (buildingData) {
            dispatch(postBuilding(values, buildingData));
        }
    };

    return (
        <section className={styles.main}>
            <Form
                name='building'
                className={styles.form}
                onFinish={handleForm}
                form={form}
            >
                <ImageList srcList={[
                    'https://www.tiafotc.org/wp-content/uploads/2020/07/CLTHQ_ArticleImage_1200x630.jpg',
                    'https://i.pinimg.com/736x/52/9d/27/529d278097123ba8b482ea3f8ce9112f.jpg',
                    'https://c0.wallpaperflare.com/preview/561/819/686/low-angle-photo-of-high-rise-buildings-under-grey-cloudy-sky.jpg',
                    'https://www.tiafotc.org/wp-content/uploads/2020/07/CLTHQ_ArticleImage_1200x630.jpg',
                    'https://i.pinimg.com/736x/52/9d/27/529d278097123ba8b482ea3f8ce9112f.jpg',
                    'https://c0.wallpaperflare.com/preview/561/819/686/low-angle-photo-of-high-rise-buildings-under-grey-cloudy-sky.jpg',
                ]} />
                <MainProperties />
                <CustomProperties />
                <div>
                    <h2 className={styles['descr-title']}>Описание:</h2>
                    <p className={styles.descr}>
                        Добро пожаловать на наш сайт недвижимости! Мы предлагаем широкий выбор жилой и коммерческой
                        недвижимости в различных районах города. Наша команда профессиональных агентов готова помочь
                        вам в выборе и покупке или аренде недвижимости, которая соответствует вашим потребностям и бюджету.
                    </p>
                </div>
                {isEdit && (
                    <Form.Item>
                        <Button
                            size='large'
                            type='primary'
                            htmlType='submit'
                        >
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </section>
    );
}

export default BuildingInfo;
