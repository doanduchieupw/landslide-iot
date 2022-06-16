import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalSilce from './reducers/globalSlice';

const rootReducer = combineReducers({
    global: globalSilce,
});
const store = configureStore({
    reducer: {
        global: globalSilce,
    },
});

export default store;
