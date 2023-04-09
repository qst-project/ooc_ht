import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICommentsData, ITaskItemData } from '@/consts';

interface CommentsState {
    isLoading: boolean,
    commentsData: ICommentsData[],
    tasks: ITaskItemData[],
}

const initialState: CommentsState = {
    isLoading: false,
    commentsData: [],
    tasks: [],
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
    },
});


export default commentsSlice.reducer;