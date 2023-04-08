interface ReplyCommentProps {
    openReply: boolean;
    setOpenReply: Function;
    modeCreateTask: boolean;
    setModeCreateTask: Function;
    openCreateTask: boolean;
    setCreateTask: Function;
}

function ReplyComment({
    setOpenReply,
    openReply,
    modeCreateTask,
    setModeCreateTask,
    openCreateTask,
    setCreateTask,
}: ReplyCommentProps) {

    const setOpen = () => {
        if (openCreateTask) {
            setCreateTask(false);
        }
        if (modeCreateTask) {
            setModeCreateTask(false);
        }
        setOpenReply(!openReply);
    };

    return (
        <span
            key='comment-nested-reply-to'
            onClick={setOpen}
        >
            Ответить
        </span>
    );
}

export default ReplyComment;