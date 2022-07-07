import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { refreshTokenRoute } from './utils/APIRoutes';

axios.defaults.withCredentials = true;
const refreshToken = async () => {
    try {
        console.log('refresh');
        const res = await axios.post(refreshTokenRoute, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            console.log('create');
            const decodedToken = jwt_decode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                console.log('inside');
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers['token'] = `Bearer ${data.accessToken}`;
            }
            return config;
        },
        (err) => Promise.reject(err)
    );
    return newInstance;
};
