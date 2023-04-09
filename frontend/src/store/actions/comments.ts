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

export const createComment = (buildingId: number, comment: string, commentId: number) => async (dispatch: AppDispatch) => {
    dispatch(commentsSlice.actions.setIsLoading(true));
    const newComment = (comment: string, commentId: number) => {
        if (commentId) {
            return {
                text: comment,
                replyId: commentId,
            };
        }
        return {
            comment: comment,
        };
    };

    const res = await axiosInstance.post(
        `${API_URL}/building/${buildingId}/comment`,
        newComment(comment, commentId),
    );
    console.log(res);
    dispatch(commentsSlice.actions.setIsLoading(false));
};