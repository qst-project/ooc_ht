import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBuildingData } from '@/consts';
import { ICustomPropertySchema } from '@/modules/CustomProperties/customPropertiesSchema';

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
        updateBuildingData(state, action: PayloadAction<Record<string, string>>) {
            Object.entries(action.payload).forEach(([propertyName, value]) => {
                if (state.buildingData) {
                    const customProperty = state.buildingData.customProperties.find(property => property.name === propertyName);
                    if (customProperty) customProperty.value = value;
                }
            });
        },
        addProperty(state, action: PayloadAction<ICustomPropertySchema>) {
            if (state.buildingData) state.buildingData.customProperties.push(action.payload);
        },
    },
});

export default buildingSlice.reducer;
