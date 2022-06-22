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
        <div className='flex flex-col justify-center items-center w-[200px]'>
            {userList?.map((userItem, index) => (
                <div
                    className='w-full py-2 mt-1 bg-gray-800 flex flex-row'
                    key={index}
                >
                    <span className='text-blue-500 flex-1'>
                        {userItem.username}
                    </span>{' '}
                    <button
                        className='text-white bg-red-400 mr-2'
                        onClick={() => handleDelete(userItem._id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Contact;
