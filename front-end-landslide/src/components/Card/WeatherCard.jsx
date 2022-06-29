import { useEffect, useState } from 'react';
import axios from 'axios';
import lodash from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCloud,
    faCloudShowersHeavy,
    faDroplet,
    faEye,
    faMagnifyingGlass,
    faWind,
} from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';

axios.defaults.withCredentials = false;

const WeatherCard = () => {
    const [time, setTime] = useState(DateTime.local());
    useEffect(() => {
        const timeId = setInterval(() => {
            setTime(DateTime.local);
        }, 1000);
        return () => clearInterval(timeId);
    }, []);

    const [city, setCity] = useState('Ha Noi');
    const [weatherData, setWeatherData] = useState({});
    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e8b33742b8bc73a3e884e2a3980eaa4&units=metric&lang=vi`
            )
            .then((res) => {
                console.log(res?.data);
                setWeatherData(res?.data);
            })
            .catch((err) => console.log('not found'));
    }, [city]);

    const handleQuery = lodash.debounce((e) => {
        setCity(e.target.value);
    }, 1000);
    return (
        <div className='relative w-[240px] h-[340px] bg-gradient-to-tr from-royal-blue to-blue-600 text-white     rounded-md'>
            {/* Weather search */}
            <div className='relative text-gray-600 focus-within:text-royal-blue mt-2 font-semibold flex justify-center'>
                <span className='absolute inset-y-0 left-4 flex items-center pl-2'>
                    <button className='p-1 focus:outline-none focus:shadow-outline'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </span>
                <input
                    type='search'
                    className='text-sm text-white bg-blue-400 rounded-md pl-10 w-[90%] leading-9 focus:outline-none focus:bg-white focus:text-blue-700'
                    placeholder='Search...'
                    autoComplete='off'
                    defaultValue={city}
                    onChange={handleQuery}
                />
            </div>
            {/* Time */}
            <div className='text-right mr-3 mt-4'>{`${
                time.c.hour >= 10 ? time.c.hour : `0${time.c.hour}`
            }:${time.c.minute >= 10 ? time.c.minute : `0${time.c.minute}`}:${
                time.c.second >= 10 ? time.c.second : `0${time.c.second}`
            }`}</div>
            {/* Weather temp */}
            <div className='mt-3 text-xl text-center'>{`${weatherData.name}, ${weatherData?.sys?.country}`}</div>
            <div className='mt-5 text-5xl text-center'>{`${Math.floor(
                weatherData?.main?.temp
            )}°C`}</div>
            <div className='flex justify-center items-center'>
                {weatherData?.weather ? (
                    <>
                        <img
                            className='w-8 mr-3'
                            src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                            alt='weather icon'
                        />
                        <p className='text-sm text-center'>
                            {weatherData?.weather[0]?.description}
                        </p>
                    </>
                ) : (
                    <></>
                )}
            </div>
            

            {/* Weather detail */}
            <div className='absolute bottom-2 inset-x-0 grid grid-cols-2 gap-2 border-t border-slate-300 p-1'>
                <div className='flex items-center ml-2'>
                    <span className='w-5'>
                        <FontAwesomeIcon icon={faDroplet} />
                    </span>
                    <span className='ml-1'>{`${
                        weatherData?.main?.humidity || '--'
                    }%`}</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-5'>
                        <FontAwesomeIcon icon={faWind} />
                    </span>
                    <span className='ml-1'>{`${
                        weatherData?.wind?.speed || '--'
                    }m/s`}</span>
                </div>
                <div className='flex items-center ml-2'>
                    <span className='w-5'>
                        <FontAwesomeIcon icon={faCloud} />
                    </span>
                    <span className='ml-1'>{`${
                        weatherData?.clouds?.all || '--'
                    }%`}</span>
                </div>
                <div className='flex items-center'>
                    <span className='w-5'>
                        <FontAwesomeIcon icon={faEye} />
                    </span>
                    <span className='ml-1'>{`${
                        weatherData?.visibility || '--'
                    }m`}</span>
                </div>
            </div>

            <div></div>
        </div>
    );
};

export default WeatherCard;
