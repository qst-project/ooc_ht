import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import buildingReducer from '@/store/slices/BuildingSlice';
import commentsReducer from '@/store/slices/CommentsSlice';
import taskReducer from '@/store/slices/TasksSlice';
import parleyReducer from '@/store/slices/ParleySlice';

const rootReducer = combineReducers({
    buildingReducer,
    commentsReducer,
    taskReducer,
    parleyReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
