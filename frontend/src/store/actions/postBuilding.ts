import { AppDispatch } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';
import { axiosInstance } from '@/api';
import { API_URL, IBuildingData, IBuildingDataBack } from '@/consts';
import { parseBuildingDataFromBack, parseBuildingDataToBack } from '@/utils/parsers';

export const postBuilding = (properties: Record<string, string>, buildingData: IBuildingData) => async (dispatch: AppDispatch) => {
    dispatch(buildingSlice.actions.setIsLoading(true));
    const buildingDataBack = parseBuildingDataToBack(buildingData, properties);
    axiosInstance.patch(`${API_URL}/buildings/${buildingDataBack.id}`, buildingDataBack).then(res => {
        console.log(res);
    });
    // dispatch(buildingSlice.actions.updateBuildingData(properties));
    dispatch(buildingSlice.actions.setIsLoading(false));
};
