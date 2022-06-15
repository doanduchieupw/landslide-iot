import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCircleQuestion, faCloudRain, faInbox, faMicroscope, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';

const sidebarList = [
    {
        title: 'Accelerometer',
        to: '/accelerometer',
        icon: <FontAwesomeIcon icon={faChartLine} />,
    },
    {
        title: 'Gyroscope',
        to: '/gyroscope',
        icon: <FontAwesomeIcon icon={faMicroscope} />,
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
    return (
        <div
            className={`sidebar ${
                open ? 'w-72' : 'w-20'
            } p-3 pt-5 duration-300 h-screen bg-royal-blue relative`}
        >
            <img
                src="/images/control.png"
                alt="control"
                className={`absolute cursor-pointer rounded-full -right-4 top-9 w-9 border-2 border-royal-blue ${
                    !open && 'rotate-180'
                }`}
                onClick={() => setOpen(!open)}
            />

            <div>
                <Link className="flex gap-x-4 items-center" to="/">
                    <img
                        src="/images/hust-logo.jpg"
                        alt="logo"
                        className="cursor-pointer duration-300 w-14"
                    />

                    <h1
                        className={`text-white origin-left font-medium text-3xl duration-300 ${
                            !open && 'scale-0'
                        }`}
                    >
                        Landslide Monitoring
                    </h1>
                </Link>
            </div>

            <div className="mt-5 border-b border-gray-400 opacity-50"></div>

            <div className="mt-10">
                {sidebarList.map((item, index) => {
                    return (
                        <div>
                            <Link
                                key={index}
                                to={`${item.to}`}
                                className={`text-white text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white
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
        </div>
    );
};

export default Sidebar;
