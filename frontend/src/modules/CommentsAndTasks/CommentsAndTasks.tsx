import { useEffect, useState } from 'react';
import { Spin, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Comment } from '@ant-design/compatible';

import styles from './CommentsAndTasks.module.scss';

import ReplyComment from '@/components/ReplyComment';
import CreateTask from '@/components/CreateTask';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchComments } from '@/store/actions';
import CommentInput from '@/components/CommentInput';
import ReplyInput from '@/components/ReplyInput';
import { ICommentsData } from '@/consts';
import TaskList from '@/modules/TaskList';


interface CommentsAndTasksProps {
    buildingId: number;
}

function CommentsList(comments: ICommentsData[], buildingId: number) {
    return (
        comments.map((comment => (
            <CommentItem
                buildingId={buildingId}
                comment={comment}
            />
        )))
    );
}

function CommentItem({
    buildingId,
    comment,
}: any) {
    const navigate = useNavigate();
    const [openReply, setOpenReply] = useState(false);
    const [openCreateTask, setCreateTask] = useState(false);
    const [modeCreateTask, setModeCreateTask] = useState(false);
    return (
        <>
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
                content={
                    comment.taskId ?
                        <p onClick={() => navigate(`/task/${comment.id}/buildings/${buildingId}`)}>
                            {comment?.text}
                        </p> :
                        <p>
                            {comment?.text}
                        </p>
                }
            >
                {RepliesComments(comment.replies, buildingId)}
            </Comment>
            {
                openReply &&
                <ReplyInput
                    commentId={comment.id}
                    buildingId={buildingId}
                    modeCreateTask={modeCreateTask}
                    openCreateTask={openCreateTask}
                    setCreateTask={setCreateTask}
                />
            }
        </>
    );
}

const RepliesComments = (data: ICommentsData[], buildingId: number) => {
    return data.map(
        (comment) => {
            return (
                <CommentItem
                    buildingId={buildingId}
                    comment={comment}
                />
            );
        },
    );
};

function CommentsAndTasks({ buildingId }: CommentsAndTasksProps) {
    const dispatch = useAppDispatch();
    const commentsData = useAppSelector(state => state.commentsReducer.commentsData);
    const loading = useAppSelector(state => state.commentsReducer.isLoading);
    useEffect(() => {
        dispatch(fetchComments(Number(buildingId)));
    }, [buildingId]);
    return (
        <Tabs
            defaultActiveKey='1'
            size={'large'}
            items={[
                {
                    label: 'Обсуждение',
                    key: '1',
                    children:
                        loading ? <Spin /> :
                            <>
                                <div className={styles.comment}>
                                    {
                                        CommentsList(commentsData, buildingId)
                                    }
                                </div>
                                <CommentInput buildingId={buildingId} />
                            </>,

                },
                {
                    label: 'Задачи',
                    key: '2',
                    children: <TaskList buildingId={buildingId} />,
                },
            ]}
        />
    );
}

export default CommentsAndTasks;
