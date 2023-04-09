import { useState } from 'react';
import { Avatar, Tabs } from 'antd';
import { Comment } from '@ant-design/compatible';

import styles from './CommentsAndTasks.module.scss';

import ReplyComment from '@/components/ReplyComment/ReplyComment';
import ReplyInput from '@/components/ReplyInput/ReplyInput';
import CreateTask from '@/components/CreateTask';


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
    const BuildingComment = (data: ICommentsData[]) => {
        return data.map(
            (comment, index) => {
                const [openReply, setOpenReply] = useState(false);
                const [openCreateTask, setCreateTask] = useState(false);
                const [modeCreateTask, setModeCreateTask] = useState(false);
                return (
                    <div key={index}>
                        <Comment
                            actions={[
                                <ReplyComment
                                    modeCreateTask={modeCreateTask}
                                    setModeCreateTask={setModeCreateTask}
                                    openReply={openReply}
                                    setOpenReply={setOpenReply}
                                    openCreateTask={openCreateTask}
                                    setCreateTask={setCreateTask}
                                />,
                                openCreateTask ? (
                                    <CreateTask
                                        modeCreateTask={modeCreateTask}
                                        setModeCreateTask={setModeCreateTask}
                                    />)
                                    : null,
                            ]}
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
                        {
                            openReply &&
                            <ReplyInput
                                modeCreateTask={modeCreateTask}
                                openCreateTask={openCreateTask}
                                setCreateTask={setCreateTask}
                            />
                        }
                    </div>
                );
            },
        );
    };

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
