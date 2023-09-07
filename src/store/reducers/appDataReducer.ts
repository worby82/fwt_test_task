import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDataReducerState, PayloadPaintingsRequestArguments } from '../../interfaces';
import { IAuthor } from '../../models/IAuthor';
import { ILocation } from '../../models/ILocation';

const initialState: AppDataReducerState = {
  paintingsRequestArguments: null,
  paintingsCurentPage: 1,
  authors: [],
  locations: [],
};

const appDataReducerSlice = createSlice({
  name: 'appDataReducer',
  initialState,
  reducers: {
    setPaintingsCurentPage: (state, action: PayloadAction<number>) => {
      state.paintingsCurentPage = action.payload;
    },
    setPaintingsRequestArguments: (
      state,
      action: PayloadAction<PayloadPaintingsRequestArguments>,
    ) => {
      if (action.payload.value !== null && action.payload.value !== '') {
        state.paintingsRequestArguments = {
          ...state.paintingsRequestArguments,
          [action.payload.argumentKey]: action.payload.value,
        };
      } else if (
        state.paintingsRequestArguments &&
        state.paintingsRequestArguments[action.payload.argumentKey]
      ) {
        delete state.paintingsRequestArguments[action.payload.argumentKey];
        if (Object.entries(state.paintingsRequestArguments).length === 0) {
          state.paintingsRequestArguments = null;
        }
      }
    },
    setAuthors: (state, action: PayloadAction<Array<IAuthor>>) => {
      state.authors = action.payload;
    },
    setLocations: (state, action: PayloadAction<Array<ILocation>>) => {
      state.locations = action.payload;
    },
  },
});

export const { setPaintingsCurentPage, setPaintingsRequestArguments, setAuthors, setLocations } =
  appDataReducerSlice.actions;

export default appDataReducerSlice.reducer;
