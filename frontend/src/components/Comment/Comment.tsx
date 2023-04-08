import React from 'react';
import styles from './Comment.module.scss';
import { CommentProps } from './Comment.types';

function Comment({ author, text, deepLevel }: CommentProps) {
    return (
        <div
            className={styles.main}
            style={{
                marginLeft: `${deepLevel * 32}px`,
            }}
        >
            <div className={styles.avatar} />
            <div className={styles.content}>
                <h3 className={styles.author}>{author}</h3>
                <p className={styles.text}>{text}</p>
                <button className={styles.reply} type='button'>Ответить</button>
            </div>
        </div>
    );
}

export default Comment;
