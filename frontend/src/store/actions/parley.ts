import { AppDispatch } from '@/store';
import { axiosInstance } from '@/api';
import { API_URL, IParleyTasks } from '@/consts';
import { parleySlice } from '@/store/slices/ParleySlice';

export const fetchParleyTasks = () => async (dispatch: AppDispatch) => {
    dispatch(parleySlice.actions.setIsLoading(true));
    const res = await axiosInstance.get<IParleyTasks>(`${API_URL}/parley/current/tasks`);
    dispatch(parleySlice.actions.setTasks(res.data));
    dispatch(parleySlice.actions.setIsLoading(false));
};
