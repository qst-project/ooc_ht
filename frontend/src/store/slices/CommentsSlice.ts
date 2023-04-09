import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICommentsData } from '@/consts';

interface CommentsState {
    isLoading: boolean,
    commentsData: ICommentsData[],
}

const initialState: CommentsState = {
    isLoading: false,
    commentsData: [],
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
    },
});


export default commentsSlice.reducer;