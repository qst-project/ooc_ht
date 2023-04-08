import React, { useEffect, useState } from 'react';

import styles from './CommentsAndTasks.module.scss';

import Comment from '@/components/Comment';

interface ICommentsData {
    author: string,
    text: string,
    id: number,
    replies: ICommentsData[],
}

const mockCommentsData: ICommentsData[] = [
    {
        author: 'Иванов И И',
        text: 'Снести здание',
        id: 1,
        replies: [
            {
                author: 'Иванов И И',
                text: 'Снести здание',
                id: 2,
                replies: [],
            },
            {
                author: 'Иванов И И',
                text: 'Снести здание',
                id: 3,
                replies: [
                    {
                        author: 'Иванов И И',
                        text: 'Снести здание',
                        id: 5,
                        replies: [],
                    },
                ],
            },
        ],
    },
    {
        author: 'Иванов И И',
        text: 'Снести здание',
        id: 4,
        replies: [],
    },
];

function CommentsAndTasks() {
    const [commentsData] = useState(mockCommentsData);
    const [commentsStack, setCommentsStack] = useState<[ICommentsData, number][]>([]);
    const _commentsStack: [ICommentsData, number][] = [];

    function parseCommentsData(commentsData: ICommentsData[], deepLevel: number) {
        commentsData.forEach(commentData => {
            _commentsStack.push([commentData, deepLevel]);
            parseCommentsData(commentData.replies, deepLevel + 1);
        });
    }

    useEffect(() => {
        parseCommentsData(commentsData, 0);
        setCommentsStack(_commentsStack);
    }, [commentsData]);

    return (
        <div className={styles.main}>
            {commentsStack.map(commentWithLevel => (
                <Comment
                    key={commentWithLevel[0].id}
                    author={commentWithLevel[0].author}
                    text={commentWithLevel[0].text}
                    deepLevel={commentWithLevel[1]}
                />
            ))}
        </div>
    );
}

export default CommentsAndTasks;
