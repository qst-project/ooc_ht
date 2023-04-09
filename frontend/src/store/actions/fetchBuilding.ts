import { saveAs} from 'file-saver';

import { AppDispatch } from '@/store';
import { buildingSlice } from '@/store/slices/BuildingSlice';
import { axiosInstance } from '@/api';
import { API_URL, IBuildingDataBack } from '@/consts';
import { parseBuildingDataFromBack } from '@/utils/parsers';

export const fetchBuilding = (buildingId: number) => async (dispatch: AppDispatch) => {
    dispatch(buildingSlice.actions.setIsLoading(true));
    dispatch(buildingSlice.actions.setIsNew(false));
    const res = await axiosInstance.get<IBuildingDataBack>(`${API_URL}/building/${buildingId}`);
    const buildingData = parseBuildingDataFromBack(res.data);
    dispatch(buildingSlice.actions.setBuildingData(buildingData));
    dispatch(buildingSlice.actions.setIsLoading(false));
};

export const fetchBuildings = (params: string) => async (dispatch: AppDispatch) => {
    dispatch(buildingSlice.actions.setIsLoading(true));
    const res = await axiosInstance.get(`${API_URL}/buildings`);
    dispatch(buildingSlice.actions.setBuildings(res.data.content));
    dispatch(buildingSlice.actions.setIsLoading(false));
};

export const exportXMLs = (ids: number[]) => async (dispatch: AppDispatch) => {
    dispatch(buildingSlice.actions.setIsLoading(true));
    const res = await axiosInstance.get(`${API_URL}/buildings/${ids.join(',')}/export`,  {responseType: 'blob'});
    saveAs(res.data, 'example.zip');
    dispatch(buildingSlice.actions.setIsLoading(false));
};

export const importXML = (file: any) => async (dispatch: AppDispatch) => {
    dispatch(buildingSlice.actions.setIsLoading(true));
    const res = await axiosInstance.post(`${API_URL}/buildings/import`, {
        file: file,
    });
    console.log(res);
    dispatch(buildingSlice.actions.setIsLoading(false));
};