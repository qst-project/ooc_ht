import { AppDispatch } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';
import { axiosInstance } from '@/api';
import { API_URL, IBuildingData } from '@/consts';
import { parseBuildingDataToBack } from '@/utils/parsers';

export const postNewBuilding = (buildingData: IBuildingData, properties: Record<string, string>) => async (dispatch: AppDispatch) => {
    dispatch(buildingSlice.actions.setIsLoading(true));
    const buildingDataBack = parseBuildingDataToBack(buildingData, properties);
    await axiosInstance.post(`${API_URL}/building`, buildingDataBack);
    dispatch(buildingSlice.actions.setIsEdit(false));
    dispatch(buildingSlice.actions.setIsLoading(false));
};
