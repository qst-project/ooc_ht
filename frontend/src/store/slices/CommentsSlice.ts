import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICommentsData, ITaskItemData } from '@/consts';

interface CommentsState {
    isLoading: boolean,
    commentsData: ICommentsData[],
    tasks: ITaskItemData[],
    isParley: boolean,
}

const initialState: CommentsState = {
    isLoading: false,
    commentsData: [],
    tasks: [],
    isParley: false,
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setCommentsData(state, action: PayloadAction<ICommentsData[]>) {
            state.commentsData = action.payload;
        },
        setTasksData(state, action: PayloadAction<ITaskItemData[]>) {
            state.tasks = action.payload;
        },
        setIsParley(state, action: PayloadAction<boolean>) {
            state.isParley = action.payload;
        },
    },
});


export default commentsSlice.reducer;
