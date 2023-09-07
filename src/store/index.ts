import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducerSlice from './reducers/themeReducerSlice';
import appDataReducer from './reducers/appDataReducer';
import { paintingsApi } from '../services/PaintingsService';
import { locationsApi } from '../services/LocationsService';
import { authorsApi } from '../services/AuthorsService';

const store = configureStore({
  reducer: {
    theme: themeReducerSlice,
    appData: appDataReducer,
    [paintingsApi.reducerPath]: paintingsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [authorsApi.reducerPath]: authorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      paintingsApi.middleware,
      locationsApi.middleware,
      authorsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
