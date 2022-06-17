import axios from 'axios';
import { loginRoute, registerRoute } from '../../utils/APIRoutes';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';

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
