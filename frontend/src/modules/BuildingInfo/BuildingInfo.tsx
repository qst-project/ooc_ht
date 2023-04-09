import React from 'react';
import { Button, Form } from 'antd';

import { useNavigate } from 'react-router-dom';

import styles from './BuildingInfo.module.scss';

import ImageList from '@/components/ImageList';

import MainProperties from '@/components/MainProperties';
import CustomProperties from '@/modules/CustomProperties';
import { useAppDispatch, useAppSelector } from '@/store';
import { patchBuilding } from '@/store/actions/patchBuilding';
import { postNewBuilding } from '@/store/actions/postNewBuilding';
import EditButton from '@/modules/EditButton';
import BuildingTitle from '@/components/BuildingTitle';
import BuildingDescription from '@/components/BuildingDescription';


function BuildingInfo() {
    const isEdit = useAppSelector(state => state.buildingReducer.isEdit);
    const buildingData = useAppSelector(state => state.buildingReducer.buildingData);
    const isNew = useAppSelector(state => state.buildingReducer.isNew);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleForm = (values: any) => {
        if (buildingData) {
            if (isNew) {
                dispatch(postNewBuilding(buildingData, values));
                navigate('/');
            } else {
                dispatch(patchBuilding(buildingData, values));
            }
        }
    };

    if (!buildingData) return null;

    return (
        <section className={styles.main}>
            <Form
                name='building'
                className={styles.form}
                onFinish={handleForm}
                form={form}
            >
                <div className={styles.top}>
                    <BuildingTitle title={buildingData.name} />
                    <EditButton />
                </div>
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
                <BuildingDescription text={'Здесь мог быть ваш комментарий'} />
                {isEdit && (
                    <Form.Item className={styles.save}>
                        <Button
                            size='large'
                            type='primary'
                            htmlType='submit'
                        >
                            {isNew ? 'Добавить в реестр' : 'Сохранить изменения'}
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </section>
    );
}

export default BuildingInfo;
