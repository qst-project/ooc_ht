import { AppDispatch } from '@/store';
// import { API_URL } from '@/consts';

import { taskSlice } from '@/store/slices/TasksSlice';

export const fetchTask = (taskId: number) => async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.setIsLoading(true));
   
    dispatch(taskSlice.actions.setIsLoading(false));
};