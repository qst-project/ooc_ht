import { AppDispatch } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';
import { axiosInstance } from '@/api';
import { API_URL, IBuildingData, IBuildingDataBack } from '@/consts';
import { parseBuildingDataFromBack, parseBuildingDataToBack } from '@/utils/parsers';

export const postBuilding = (properties: Record<string, string>, buildingData: IBuildingData) => async (dispatch: AppDispatch) => {
    dispatch(buildingSlice.actions.setIsLoading(true));
    const buildingDataBack = parseBuildingDataToBack(buildingData, properties);
    await axiosInstance.patch(`${API_URL}/building/${buildingDataBack.id}`, buildingDataBack);
    const res = await axiosInstance.get<IBuildingDataBack>(`${API_URL}/building/${buildingData.id}`);
    const newBuildingData = parseBuildingDataFromBack(res.data);
    dispatch(buildingSlice.actions.setBuildingData(newBuildingData));
    dispatch(buildingSlice.actions.setIsEdit(false));
    dispatch(buildingSlice.actions.setIsLoading(false));
};
