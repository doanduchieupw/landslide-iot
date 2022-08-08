import { useState } from 'react';
import { Chart, AccelChart } from '../components';

const Accelerometer = () => {
    const [live, setLive] = useState(true)
    return (
        <div className='w-full'>
            <button className='block ml-auto bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={() => setLive(!live)}>{live ? `Realtime` : `Not Realtime`}</button>
            <div style={{ maxWidth: '1000px' }} className='mx-auto mt-4'>
                {live ? <Chart type='acc' /> : <AccelChart />}
            </div>
        </div>
    );
};

export default Accelerometer;
