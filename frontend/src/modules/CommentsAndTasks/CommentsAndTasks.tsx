import { useEffect, useState } from 'react';
import { Spin, Tabs } from 'antd';
import { Comment } from '@ant-design/compatible';

import styles from './CommentsAndTasks.module.scss';

import ReplyComment from '@/components/ReplyComment';
import CreateTask from '@/components/CreateTask';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchComments } from '@/store/actions';
import CommentInput from '@/components/CommentInput';
import ReplyInput from '@/components/ReplyInput';
import { ICommentsData } from '@/consts';

// const mockCommentsData: ICommentsData[] = [
//     {
//         author: 'Иванов И И',
//         text: 'Снести здание',
//         id: 1,
//         replies: [
//             {
//                 author: 'Иванов И И',
//                 text: 'Снести здание',
//                 id: 2,
//                 replies: [],
//             },
//             {
//                 author: 'Иванов И И',
//                 text: 'Снести здание',
//                 id: 3,
//                 replies: [
//                     {
//                         author: 'Иванов И И',
//                         text: 'Снести здание нахуй',
//                         id: 5,
//                         replies: [],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         author: 'Иванов И И',
//         text: 'Снести здание',
//         id: 4,
//         replies: [],
//     },
// ];

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
    console.log(commentsData);
    useEffect(() => {
        dispatch(fetchComments(Number(buildingId)));
    }, [buildingId]);
    // const BuildingComment = (data: ICommentsData[]) => {
    //     return data.map(
    //         (comment, index) => {
    //             // const [openReply, setOpenReply] = useState(false);
    //             // const [openCreateTask, setCreateTask] = useState(false);
    //             // const [modeCreateTask, setModeCreateTask] = useState(false);
    //             return (
    //                 <div key={index}>
    //                     <Comment
    //                         actions={[
    //                             <ReplyComment
    //                                 modeCreateTask={modeCreateTask}
    //                                 setModeCreateTask={() => setModeCreateTask}
    //                                 openReply={openReply}
    //                                 setOpenReply={() => setOpenReply}
    //                                 openCreateTask={openCreateTask}
    //                                 setCreateTask={setCreateTask}
    //                             />,
    //                             openCreateTask ? (
    //                                 <CreateTask
    //                                     modeCreateTask={modeCreateTask}
    //                                     setModeCreateTask={setModeCreateTask}
    //                                 />)
    //                                 : null,
    //                         ]}
    //                         author={comment.author}
    //                         content={
    //                             <p>
    //                                 {comment.text}
    //                             </p>
    //                         }
    //                     >
    //                         {BuildingComment(comment.replies)}
    //                     </Comment>
    //                     {
    //                         openReply &&
    //                         <ReplyInput
    //                             buildingId={buildingId}
    //                             modeCreateTask={modeCreateTask}
    //                             openCreateTask={openCreateTask}
    //                             setCreateTask={setCreateTask}
    //                         />
    //                     }
    //                 </div>
    //             );
    //         },
    //     );
    // };

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
                                        CommentsList(commentsData,buildingId)
                                    }
                                </div>
                                <CommentInput buildingId={buildingId} />
                            </>,

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
