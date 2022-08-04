const typeCard = {
    acc: {
        imgSrc: '/images/accelerometers-icon.jpg',
        title: 'Accelerometer',
    },

    gyro: {
        imgSrc: '/images/gyroscopes-icon.jpg',
        title: 'Gyroscope',
    },

    temp: {
        imgSrc: '/images/temp-humi-icon.jpg',
        title: 'Temp & Humi ',
    },
    rain: {
        imgSrc: '/images/rain-icon.jpg',
        title: 'Rain',
    },
};

const Card = ({ type, value }) => {
    return (
        <div className='bg-royal-blue border border-royal-blue rounded-lg w-[180px] h-[270px] text-white shadow-xl'>
            <div className='w-full h-24'>
                <img
                    className='w-full rounded-t-lg h-full'
                    src={
                        type === 'acc'
                            ? typeCard.acc.imgSrc
                            : type === 'gyro'
                            ? typeCard.gyro.imgSrc
                            : type === 'temp'
                            ? typeCard.temp.imgSrc
                            : typeCard.rain.imgSrc
                    }
                    alt=''
                />
            </div>
            <h1 className='text-center text-xl font-bold mt-3'>
                {type === 'acc'
                    ? typeCard.acc.title
                    : type === 'gyro'
                    ? typeCard.gyro.title
                    : type === 'temp'
                    ? typeCard.temp.title
                    : typeCard.rain.title}
            </h1>
            <div className='mt-3 flex flex-col justify-center items-center gap-y-3'>
                {type === 'acc' || type === 'gyro' ? (
                    <div>
                        <p>
                            {`X: ${value[0]}`}{' '}
                            {type === 'acc' ? (
                                <span>g</span>
                            ) : (
                                <span>
                                    <sup>o</sup>/s
                                </span>
                            )}
                        </p>
                        <p>
                            {`Y: ${value[1]}`}{' '}
                            {type === 'acc' ? (
                                <span>g</span>
                            ) : (
                                <span>
                                    <sup>o</sup>/s
                                </span>
                            )}
                        </p>
                        <p>
                            {`Z: ${value[2]}`}{' '}
                            {type === 'acc' ? (
                                <span>g</span>
                            ) : (
                                <span>
                                    <sup>o</sup>/s
                                </span>
                            )}
                        </p>
                    </div>
                ) : type === 'temp' ? (
                    <>
                        <p>{`Temp: ${value[0]} °C`}</p>
                        <p>{`Humi: ${value[1]} %`}</p>
                        <p>{`Mois: ${value[2]} %`}</p>
                    </>
                ) : (
                    <>
                        <p>{`Rain: ${value[0]} mm`}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;
