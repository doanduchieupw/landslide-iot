import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faCircleQuestion,
    faCloudRain,
    faInbox,
    faMicroscope,
    faRightFromBracket,
    faRightToBracket,
    faTemperatureHalf,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../redux/reducers/authSlice';
import { logoutUser } from '../../redux/reducers/apiRequest';
import { createAxios } from '../../createInstance';

const sidebarList = [
    {
        title: 'Accelerometer',
        to: '/accelerometer',
        icon: <FontAwesomeIcon icon={faChartLine} />,
    },
    {
        title: 'Temp & Humi',
        to: '/temp-humi-mois',
        icon: <FontAwesomeIcon icon={faTemperatureHalf} />,
    },
    {
        title: 'Rain',
        to: '/rain',
        icon: <FontAwesomeIcon icon={faCloudRain} />,
    },
    {
        title: 'Alert',
        to: '/alert',
        icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
    },
    {
        title: 'FAQS',
        to: '/faqs',
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        gap: true,
    },
    {
        title: 'Contact',
        to: '/contact',
        icon: <FontAwesomeIcon icon={faInbox} />,
    },
];

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const user = useSelector((state) => state.auth?.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = user?._id;
    const accessToken = user?.accessToken;

    let axiosJWT = createAxios(user, dispatch, logoutSuccess)

    const handleLogout = () => {
        logoutUser(dispatch, id, navigate, accessToken, axiosJWT)
    }
    return (
        <div
            className={`sidebar ${
                open ? 'w-72' : 'w-20'
            } p-3 pt-5 duration-300 h-screen border-r border-r-royal-blue bg-royal-blue relative dark:bg-black-sidebar dark:border-r-slate-50`}
        >
            <img
                src='/images/control.png'
                alt='control'
                className={`absolute cursor-pointer rounded-full -right-4 top-9 w-9 border-2 border-royal-blue dark:border-slate-50 z-10 ${
                    !open && 'rotate-180'
                }`}
                onClick={() => setOpen(!open)}
            />

            <div>
                <Link className='flex gap-x-4 items-center' to='/'>
                    <img
                        src='/images/hust-logo.jpg'
                        alt='logo'
                        className='cursor-pointer duration-300 w-14'
                    />

                    <h1
                        className={`text-white dark:text-black-font origin-left font-medium text-3xl duration-300 ${
                            !open && 'scale-0'
                        }`}
                    >
                        Landslide Monitoring
                    </h1>
                </Link>
            </div>

            <div className='mt-5 border-b border-gray-400 opacity-50'></div>

            <div className='mt-10'>
                {sidebarList.map((item, index) => {
                    return (
                        <div key={index}>
                            <Link
                                to={`${item.to}`}
                                className={`text-white dark:text-black-font dark:hover:text-white text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white
                                 rounded-md ${item.gap ? 'mt-9' : 'mt-4'}`}
                            >
                                <p className={`leading-7 ml-2`}>{item.icon}</p>
                                <span
                                    className={`${
                                        !open && 'hidden'
                                    } origin-left text-md truncate duration-300`}
                                >
                                    {item.title}
                                </span>
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className='absolute bottom-3 left-0 right-0'>
                {user ? (
                    <div className='text-white flex flex-col items-center gap-y-4'>
                        <p className={`${!open && 'hidden'}`}>
                            Hi, <span className=''>{user.username}</span>!
                        </p>
                        <Link
                            to='/logout'
                            className={`text-royal-blue font-bold  rounded-md bg-royal-orange flex justify-center gap-x-4 ${
                                open ? 'px-10 py-3' : 'px-4 py-2'
                            }`}
                            onClick={handleLogout}
                        >
                            <p className={`${!open && 'hidden'} self-center`}>
                                Logout
                            </p>
                            <p className={`leading-7`}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </p>
                        </Link>
                    </div>
                ) : (
                    <Link
                        to='/login'
                        className={`text-royal-blue font-bold  rounded-md bg-royal-orange flex justify-center gap-x-4 mx-auto ${
                            open ? 'px-10 py-3' : 'px-4 py-2'
                        }`}
                    >
                        <span className={`${!open && 'hidden'} self-center`}>
                            Login
                        </span>
                        <span className={`leading-7 ml-3`}>
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
