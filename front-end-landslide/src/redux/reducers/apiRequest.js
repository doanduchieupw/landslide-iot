import axios from 'axios';
import { loginRoute, logoutRoute, registerRoute } from '../../utils/APIRoutes';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(loginRoute, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        dispatch(loginFailed());
    }
};
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const { data } = await axios.post(registerRoute, user);
        if (data && !data.status) {
            return {
                error: true,
                type: data.type,
                message: data.message,
            }
        }
        dispatch(registerSuccess());
        navigate('/');
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const logoutUser = async (dispatch,id, navigate, token, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(logoutRoute, id,  {
            headers: `Bearer ${token}`
        })
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(logoutFailed());
    }
};
