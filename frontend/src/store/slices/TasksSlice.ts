import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITaskItemData } from '@/consts';

interface CommentsState {
    isLoading: boolean,
    task: ITaskItemData,
}

const initialState: CommentsState = {
    isLoading: false,
    task: {} as ITaskItemData,
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setCommentsData(state, action: PayloadAction<ITaskItemData>) {
            state.task = action.payload;
        },
    },
});


export default taskSlice.reducer;