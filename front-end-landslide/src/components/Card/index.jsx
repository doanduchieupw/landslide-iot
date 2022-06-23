const Card = ({ props }) => {
    return (
        <div className='bg-royal-blue border border-royal-blue rounded-lg w-[180px] h-[270px] text-white shadow-xl'>
            <div className='w-full h-24'>
                <img
                    className='w-full rounded-t-lg h-full'
                    src='/images/accelerometers-icon.jpg'
                    alt=''
                />
            </div>
            <h1 className='text-center text-xl font-bold mt-3'>Accelerometer</h1>
            <div className='mt-3 flex flex-col justify-center items-center gap-y-3'>
                <p>
                    X: 12 m/s<sup>2</sup>
                </p>
                <p>
                    Y: 12 m/s<sup>2</sup>
                </p>
                <p>
                    Z: 12 m/s<sup>2</sup>
                </p>
            </div>
        </div>
    );
};

export default Card;
