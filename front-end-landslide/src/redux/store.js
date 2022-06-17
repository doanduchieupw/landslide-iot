import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import globalSilce from './reducers/globalSlice';


const store = configureStore({
    reducer: {
        global: globalSilce,
        auth: authSlice,
    },
});

export default store;
