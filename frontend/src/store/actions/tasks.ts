import { AppDispatch } from '@/store';
import { axiosInstance } from '@/api';
import { API_URL } from '@/consts';

import { taskSlice } from '@/store/slices/TasksSlice';

export const fetchTasks = () => async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.setIsLoading(true));
    const res = await axiosInstance.get(`${API_URL}/myTasks`);
    console.log(res);
    dispatch(taskSlice.actions.setIsLoading(false));
};

export const fetchTask = (taskId: number, buildingId: number) => async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.setIsLoading(true));
    const res = await axiosInstance.get(`${API_URL}/building/${buildingId}/comment/${taskId}/task`);
    dispatch(taskSlice.actions.setTask(res.data));
    dispatch(taskSlice.actions.setIsLoading(false));
};