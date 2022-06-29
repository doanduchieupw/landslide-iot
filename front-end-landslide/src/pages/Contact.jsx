import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '../redux/reducers/apiRequest';
import { loginSuccess } from '../redux/reducers/authSlice';
import { createAxios } from '../createInstance';

const Contact = () => {
    const user = useSelector((state) => state.auth?.login?.currentUser);
    const userList = useSelector((state) => state.user?.user?.allUsers);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDelete = (id) => {
        deleteUser(user?.accessToken, dispatch, id, axiosJWT);
    };

    useEffect(() => {
        getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }, []);

    return (
        <>contact</>
    );
};

export default Contact;
