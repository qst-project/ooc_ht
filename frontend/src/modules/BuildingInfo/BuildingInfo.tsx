import React from 'react';
import styles from './BuildingInfo.module.scss';
import ImageList from '@/components/ImageList';
import TaskList from '@/components/TaskList';

function BuildingInfo() {
  return (
    <section className={styles.main}>
      <ImageList srcList={[
        'https://www.tiafotc.org/wp-content/uploads/2020/07/CLTHQ_ArticleImage_1200x630.jpg',
        'https://i.pinimg.com/736x/52/9d/27/529d278097123ba8b482ea3f8ce9112f.jpg',
        'https://c0.wallpaperflare.com/preview/561/819/686/low-angle-photo-of-high-rise-buildings-under-grey-cloudy-sky.jpg',
        'https://www.tiafotc.org/wp-content/uploads/2020/07/CLTHQ_ArticleImage_1200x630.jpg',
        'https://i.pinimg.com/736x/52/9d/27/529d278097123ba8b482ea3f8ce9112f.jpg',
        'https://c0.wallpaperflare.com/preview/561/819/686/low-angle-photo-of-high-rise-buildings-under-grey-cloudy-sky.jpg',
      ]} />
      <TaskList
        tasks={['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4']}
      />
    </section>
  );
}

export default BuildingInfo;
