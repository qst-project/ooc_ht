import { AppDispatch } from '@/store';
import { axiosInstance } from '@/api';
import { API_URL } from '@/consts';
import { commentsSlice } from '@/store/slices/CommentsSlice';

export const fetchComments = (buildingId: number) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setIsLoading(true));
    const res = await axiosInstance.get(`${API_URL}/building/${buildingId}/comments`);
    dispatch(commentsSlice.actions.setCommentsData(res.data));
    console.log(res);
    dispatch(commentsSlice.actions.setIsLoading(false));
};

export const createComment = (buildingId: number, comment: string, commentId: number | undefined) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setIsLoading(true));
    const newComment = (comment: string, commentId: number | undefined) => {
        if (commentId) {
            return {
                text: comment,
                replyTo: commentId,
            };
        }
        return {
            text: comment,
        };
    };

    const res = await axiosInstance.post(
        `${API_URL}/building/${buildingId}/comment`,
        newComment(comment, commentId),
    );
    console.log(res);
    dispatch(commentsSlice.actions.setIsLoading(false));
};

export const createTask = (buildingId: number, task: any) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setIsLoading(true));
    const res = await axiosInstance.post(
        `${API_URL}/building/${buildingId}/task`,
        task,
    );
    console.log(res);
    dispatch(commentsSlice.actions.setIsLoading(false));
};

export const fetchTasks = (buildingId: number) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setIsLoading(true));
    const res = await axiosInstance.get(
        `${API_URL}/building/${buildingId}/tasks`,
    );
    console.log(res);
    dispatch(commentsSlice.actions.setTasksData(res.data));
    dispatch(commentsSlice.actions.setIsLoading(false));
};