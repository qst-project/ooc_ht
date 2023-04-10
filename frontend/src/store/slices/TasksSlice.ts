import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITaskItemData } from '@/consts';

interface CommentsState {
    isLoading: boolean,
    task: ITaskItemData,
    file: any,
}

const initialState: CommentsState = {
    isLoading: false,
    task: {} as ITaskItemData,
    file: {},
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setTask(state, action: PayloadAction<ITaskItemData>) {
            state.task = action.payload;
        },
        setFile(state, action: PayloadAction<any>) {
            state.file = action.payload;
        },
    },
});


export default taskSlice.reducer;