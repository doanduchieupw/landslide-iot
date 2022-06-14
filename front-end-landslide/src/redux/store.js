import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { globalSilce } from './reducers/globalSlice';

const rootReducer = combineReducers({
    global: globalSilce,
});
export const store = configureStore({
    reducer: {
        global: globalSilce,
    },
});
