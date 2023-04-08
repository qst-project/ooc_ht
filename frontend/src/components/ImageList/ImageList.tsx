import { Image } from 'antd';

import styles from './ImageList.module.scss';
import { ImageListProps } from './ImageList.types';

function ImageList({ srcList }: ImageListProps) {
  return (
    <div className={styles.main}>
      {srcList.map(src => (
        <Image
          src={src}
          className={styles.img}
          rootClassName={styles['list-item']}
        />
      ))}
    </div>
  );
}

export default ImageList;
