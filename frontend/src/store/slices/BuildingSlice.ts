import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICustomPropertySchema } from '@/modules/CustomProperties/customPropertiesSchema';

interface BuildingState {
    groups: string[],
    customPropertySchemas: ICustomPropertySchema[],
}

const initialState: BuildingState = {
    groups: [],
    customPropertySchemas: [],
};

export const buildingSlice = createSlice({
    name: 'building',
    initialState,
    reducers: {
        setGroups(state, action: PayloadAction<string[]>) {
            state.groups = action.payload;
        },
        setCustomPropertySchemas(state, action: PayloadAction<ICustomPropertySchema[]>) {
            state.customPropertySchemas = action.payload;
        },
    },
});

export default buildingSlice.reducer;
