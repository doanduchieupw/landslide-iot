import { createSlice } from '@reduxjs/toolkit';

export const globalSilce = createSlice({
    name: 'global',
    initialState: {
        darkMode: false,
    },
    reducers: {
        toggleDarkMode: (state, action) => {
            return {
                ...state,
                darkMode: action.payload,
            };
        },
    },
});

export const { toggleDarkMode } = globalSilce.actions

export default globalSilce.reducer