import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IParleyTasks } from '@/consts';

interface ParleyState {
    tasks?: IParleyTasks,
    isLoading: boolean,
}

const initialState: ParleyState = {
    isLoading: false,
};

export const parleySlice = createSlice({
    name: 'parley',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setTasks(state, action: PayloadAction<IParleyTasks>) {
            state.tasks = action.payload;
        },
    },
});

export default parleySlice.reducer;
