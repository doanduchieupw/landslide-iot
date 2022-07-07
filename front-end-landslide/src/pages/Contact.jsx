import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, getContact } from '../redux/reducers/apiRequest';
import { loginSuccess } from '../redux/reducers/authSlice';
import { createAxios } from '../createInstance';

const Contact = () => {
    const user = useSelector((state) => state.auth?.login?.currentUser);
    const userList = useSelector((state) => state.user?.user?.allUsers);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [chat, setChat] = useState(null)
    
    useEffect(() => {
        getAllUsers(user?.accessToken, dispatch, axiosJWT);
        console.log("useEffect getAllUser");
    }, []);
    // useEffect(() => {
    //     const {data} =  getContact(user?.accessToken, dispatch, user?.id, axiosJWT)
    //     console.log("🚀 ~ file: Contact.jsx ~ line 19 ~ useEffect ~ data", data)
    //     setChat(data);
    // }, []);

    return <div className=''></div>;
};

export default Contact;
