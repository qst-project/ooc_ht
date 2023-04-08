import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBuildingData } from '@/consts';

interface BuildingState {
    isLoading: boolean,
    isEdit: boolean,
    groups: string[],
    buildingData?: IBuildingData,
}

const initialState: BuildingState = {
    isLoading: false,
    isEdit: false,
    groups: [],
};

export const buildingSlice = createSlice({
    name: 'building',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setGroups(state, action: PayloadAction<string[]>) {
            state.groups = action.payload;
        },
        setBuildingData(state, action: PayloadAction<IBuildingData>) {
            state.buildingData = action.payload;
        },
        setIsEdit(state, action: PayloadAction<boolean>) {
            state.isEdit = action.payload;
        },
    },
});

export default buildingSlice.reducer;
