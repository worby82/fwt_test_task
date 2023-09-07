import { createSlice } from '@reduxjs/toolkit';
import { ThemeReducerState } from '../../interfaces';

const initialState: ThemeReducerState = {
  isDarkTheme: false,
};

const themeReducerSlice = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { toggleTheme } = themeReducerSlice.actions;

export default themeReducerSlice.reducer;
