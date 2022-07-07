import axios from 'axios';
import {
    loginRoute,
    logoutRoute,
    registerRoute,
    allUsersRoute,
    host,
} from '../../utils/APIRoutes';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import {
    getUserContactFailed,
    getUserContactStart,
    getUserContactSuccess,
} from './contactSlice';
import {
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
} from './userSlice';


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(loginRoute, user,
            // {
            // withCredentials: true,
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //     },
        // }
        );
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        dispatch(loginFailed());
    }
};
export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const { data } = await axios.post(registerRoute, user);
        if (data && !data.status) {
            return {
                error: true,
                type: data.type,
                message: data.message,
            };
        }
        dispatch(registerSuccess());
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const logoutUser = async (dispatch, id, navigate, token, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(logoutRoute, id, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(logoutFailed());
    }
};

export const getAllUsers = async (token, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try {
        const res = await axiosJWT.get(allUsersRoute, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailed());
    }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete(`${host}/api/users/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailed(err.response?.data));
    }
};
export const getContact = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(getUserContactStart());
    try {
        const res = await axiosJWT.get(`${host}/api/contact/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUserContactSuccess(res.data));
    } catch (err) {
        dispatch(getUserContactFailed(err.response?.data));
    }
};
