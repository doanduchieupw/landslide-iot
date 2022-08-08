import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { addMessage, getMessages, getUserRoute } from '../../utils/APIRoutes';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatBox = ({
    chat,
    currentUserId,
    currentUser,
    setSendMessage,
    receiveMessage,
}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const scroll = useRef();

    //fetching message
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(getMessages(chat._id));
                setMessages(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMessages();
        console.log('re-render');
    }, [chat]);
    // send message
    const handleSend = async () => {
        // e.preventDefault();
        const message = {
            senderId: currentUserId,
            mess: text,
            chatId: chat._id,
        };
        const receiverId = chat.members.find((id) => id !== currentUserId);
        setSendMessage({...message, receiverId})
        try {
            const { data } = await axios.post(addMessage, message);
            setMessages([...messages, data]);
            setText('');
            
        } catch (err) {
            console.log(err);
        }
        
    };

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
            setMessages([...messages, receiveMessage]);
        }
    }, [receiveMessage]);

    useEffect(() => {
        const userId = chat?.members.find((id) => id !== currentUserId);
        const getUserData = async () => {
            await axios.get(getUserRoute(userId)).then((res) => {
                setUserData(res.data);
            });
        };
        if (chat !== null) getUserData();
    }, [chat, currentUserId]);

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: "smooth"})   
    }, [messages])

    return (
        <div className='h-[90vh] bg-white rounded-2xl relative'>
            {/* overflow-scroll overflow-x-hidden */}
            <div className='flex flex-col h-[90%] mt-2 '>
                <SimpleBar style={{ maxHeight: `100%` }}>
                    {messages?.map((message, index) => (
                        <div
                            key={index}
                            ref={scroll}
                            className={`flex gap-x-2 mt-1 ${
                                message.senderId === currentUserId
                                    ? 'mr-2 flex-row-reverse'
                                    : 'ml-2'
                            }`}
                        >
                            <div
                                className={`w-10 h-10  text-white text-xl font-bold text-center leading-10 capitalize rounded-full ${
                                    message.senderId === currentUserId
                                        ? 'bg-gray-400'
                                        : 'bg-royal-blue'
                                }`}
                            >
                                {message.senderId === currentUserId
                                    ? currentUser.charAt(0)
                                    : userData?.username.charAt(0)}
                            </div>
                            <span
                                className={`${
                                    message.senderId === currentUserId
                                        ? 'bg-slate-100 ml-auto text-slate-800'
                                        : 'bg-blue-500 mr-auto text-slate-100'
                                } w-fit max-w-xs rounded-md p-2 text-justify flex flex-col justify-end`}
                            >
                                {message?.mess}
                                <span className='block ml-auto text-[8px]'>
                                    {moment(message?.createdAt).fromNow()}
                                </span>
                            </span>
                        </div>
                    ))}
                </SimpleBar>
            </div>
            <div className='absolute bottom-1 w-full h-14 flex gap-x-2'>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleSend}
                    placeholder='Type a message'
                    borderColor='#8f8f8f'
                    theme='light'
                />
                <div
                    type='button'
                    className='inline-block rounded-full bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-10 h-10 my-auto mr-2'
                    onClick={handleSend}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
