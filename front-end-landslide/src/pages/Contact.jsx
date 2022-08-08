import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { loginSuccess } from '../redux/reducers/authSlice';
import { createAxios } from '../createInstance';
import { createContact, userContact } from '../utils/APIRoutes';
import { ChatBox, Conversation } from '../components';
import axios from 'axios';

const Contact = () => {
    const user = useSelector((state) => state.auth?.login?.currentUser);

    const dispatch = useDispatch();
    const [chats, setChats] = useState([]);
    const [refresh, setRefresh] = useState();
    console.log('🚀 ~ file: Contact.jsx ~ line 16 ~ Contact ~ chats', chats);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const socket = useRef();

    const handleContactAdmin = async () => {
        const { data } = await axios.post(createContact, {
            senderId: user._id,
            receiverId: '62ee4893e18be0b0a419686c',
        });
        setRefresh(data)
    };
    //Get mess from db
    useEffect(() => {
        const getChats = async () => {
            try {
                await axios
                    .get(userContact(user._id))
                    .then((res) => setChats(res.data));
            } catch (err) {
                console.log(err);
            }
        };
        getChats();
        console.log(chats === []);
    }, [user._id, refresh]);
    //Connect to socket
    useEffect(() => {
        socket.current = io('ws://localhost:8080');
        socket.current.emit('new-user-add', user._id);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        });
    }, [user]);
    //SendMessage to socket
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    //Get message from socket
    useEffect(() => {
        socket.current.on('receive-message', (data) => {
            setReceiveMessage(data);
        });
    }, []);

    return (
        <div className='grid grid-cols-[1fr_4fr] gap-x-4 h-full'>
            <div className='h-full flex flex-col bg-white rounded-2xl'>
                <h3 className='mt-2 capitalize text-center text-2xl font-bold'>
                    CONTACT
                </h3>
                {chats.length === 0 && (
                    <div
                        className='mx-2 my-auto text-white text-center text-lg font-bold bg-royal-blue rounded-md hover:opacity-75 cursor-pointer'
                        onClick={handleContactAdmin}
                    >
                        Click here to contact admin
                    </div>
                )}
                {chats?.map((chat, index) => (
                    <div key={index} onClick={() => setCurrentChat(chat)}>
                        <Conversation refresh={refresh} data={chat} currentUserId={user._id} />
                    </div>
                ))}
            </div>
            {currentChat && (
                <ChatBox
                    chat={currentChat}
                    currentUserId={user._id}
                    currentUser={user.username}
                    setSendMessage={setSendMessage}
                    receiveMessage={receiveMessage}
                />
            )}
        </div>
    );
};

export default Contact;
