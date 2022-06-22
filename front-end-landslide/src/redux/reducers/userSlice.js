import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        getUsersStart: (state) => {
            state.user.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.user.isFetching = false;
            state.user.allUsers = action.payload;
            state.user.error = false;
        },
        getUsersFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
        deleteUserStart: (state) => {
            state.user.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.user.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state, action) => {
            state.user.isFetching = false;
            state.user.error = true;
            state.msg = action.payload;
        },
    },
});
export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
