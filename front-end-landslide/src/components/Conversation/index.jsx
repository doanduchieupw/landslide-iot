import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserRoute } from '../../utils/APIRoutes';
const Conversation = ({ refresh, data, currentUserId }) => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const userId = data?.members.find((id) => id !== currentUserId);
        const getUserData = async () => {
            await axios.get(getUserRoute(userId)).then((res) => {
                setUserData(res.data);
            });
        };
        getUserData();
    }, [refresh]);
    return (
        <div className='flex mt-1 mx-1  p-1 cursor-pointer rounded-md border-b hover:bg-slate-200 hover:duration-150'>
            <div className='w-10 h-10 bg-royal-blue text-white text-xl font-bold text-center leading-10 capitalize rounded-full'>
                {userData?.username.charAt(0)}
            </div>
            <p className='ml-2 flex items-center '>{userData?.username}</p>
        </div>
    );
};

export default Conversation;
