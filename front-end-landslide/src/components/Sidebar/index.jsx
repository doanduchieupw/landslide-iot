import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

const sidebarList = [
    { title: 'Accelerometer', to: '/acc-parameter' },
    { title: 'Gyroscope ', to: '/gyro-parameter' },
    { title: 'Temp & Humi', to: '/temp-humi-parameter' },
    { title: 'Rain', to: '/temp-humi-parameter' },
    { title: 'FAQS', to: '/faqs' },
    { title: 'Contact', to: '/contact' },
];

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div
            className={`sidebar ${
                open ? 'w-72' : 'w-20'
            } p-3 pt-5 duration-300 h-screen bg-royal-blue relative`}
        >
            <img
                src='/images/control.png'
                alt='control'
                className={`absolute cursor-pointer rounded-full -right-4 top-9 w-9 border-2 border-royal-blue ${
                    !open && 'rotate-180'
                }`}
                onClick={() => setOpen(!open)}
            />

            <div className='flex gap-x-4 items-center'>
                <img
                    src='/images/hust-logo.jpg'
                    alt='logo'
                    className='cursor-pointer duration-300 w-14 '
                />
                <h1
                    className={`text-white origin-left font-medium text-3xl duration-300 ${
                        !open && 'scale-0'
                    }`}
                >
                    Landslide Monitoring
                </h1>
            </div>

            <div className='mt-5 border-b border-gray-400 opacity-50'></div>

            <div className='mt-10'>
                {sidebarList.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={`${item.to}`}
                            className='text-white text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white
                            '
                        >
                            <FontAwesomeIcon icon={solid('user-secret')} />
                            {item.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
