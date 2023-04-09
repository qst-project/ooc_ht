import { AppDispatch } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';
import { axiosInstance } from '@/api';
import { API_URL, IBuildingDataBack } from '@/consts';
import { parseBuildingDataFromBack } from '@/utils/parsers';

export const fetchBuilding = (buildingId: number) => async (dispatch: AppDispatch) => {
    dispatch(buildingSlice.actions.setIsLoading(true));
    const res = await axiosInstance.get<IBuildingDataBack>(`${API_URL}/building/${buildingId}`);
    const buildingData = parseBuildingDataFromBack(res.data);
    dispatch(buildingSlice.actions.setBuildingData(buildingData));
    dispatch(buildingSlice.actions.setIsLoading(false));
};
