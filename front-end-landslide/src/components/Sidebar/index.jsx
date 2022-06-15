import { useState } from 'react';
import { Link } from 'react-router-dom';

const sidebarList = [
    { title: 'Thong so Accelerometer', to: '/acc-parameter' },
    { title: 'Thong so Gyroscope ', to: '/gyro-parameter' },
    { title: 'Thong so nhiet do, do am', to: '/temp-humi-parameter' },
    { title: 'Hoi dap', to: '/faqs' },
    { title: 'Lien he', to: '/contact' },
];

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div
            className={`sidebar ${
                open ? 'w-72' : 'w-20'
            } p-3 pt-5 duration-300 h-screen bg-blue-500 relative`}
        >
            <img
                src='/images/control.png'
                alt='control'
                className={`absolute cursor-pointer rounded-full -right-4 top-9 w-9 border-2 border-blue-500 ${
                    !open && 'rotate-180'
                }`}
                onClick={() => setOpen(!open)}
            />

            <div className='flex gap-x-5 items-center'>
                <img
                    src='/images/hust-logo.jpg'
                    alt='logo'
                    className='cursor-pointer duration-300 w-10 '
                />
                <h1
                    className={`text-white origin-left font-medium text-xl duration-300 ${
                        !open && 'scale-0'
                    }`}
                >
                    Landslide monitoring
                </h1>
            </div>

            <div className='mt-4'>
                {sidebarList.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={`${item.to}`}
                            className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:opacity-80'
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
