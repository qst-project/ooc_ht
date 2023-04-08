import { useEffect, useState } from 'react';
import { Avatar, Tabs } from 'antd';
import { Comment } from '@ant-design/compatible';

import styles from './CommentsAndTasks.module.scss';

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
                        text: 'Снести здание нахуй',
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

    const BuildingComment = (data: ICommentsData[]) => (
        data.map(
            comment => (
                <Comment
                    actions={[<span key='comment-nested-reply-to'>Ответить</span>]}
                    author={comment.author}
                    avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt={comment.author} />}
                    content={
                        <p>
                            {comment.text}
                        </p>
                    }
                >
                    {BuildingComment(comment.replies)}
                </Comment>
            ),
        )

    );

    return (
        <Tabs
            defaultActiveKey='1'
            size={'large'}
            items={[
                {
                    label: 'Обсуждение',
                    key: '1',
                    children:
                        <div className={styles.comment}>
                            {
                                BuildingComment(mockCommentsData)
                            }
                        </div>,
                },
                {
                    label: 'Задачи',
                    key: '2',
                    children: 'Задачи',
                },
            ]}
        />
    );
}

export default CommentsAndTasks;
