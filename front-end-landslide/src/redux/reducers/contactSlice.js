import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
    name: 'contact', 
    initialState: {
        user: {
            userContact: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: { 
        getUserContactStart: (state) => {
            state.user.isFetching = true;
        }, 
        getUserContactSuccess: (state, action) => {
            state.user.isFetching = false;
            state.user.userContact = action.payload;
            state.user.error = false;
        },
        getUserContactFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        }
        
    }
})

export const { getUserContactStart, getUserContactSuccess, getUserContactFailed } = contactSlice. actions;
export default contactSlice.reducer