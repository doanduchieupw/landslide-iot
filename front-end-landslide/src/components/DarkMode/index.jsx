import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun } from '../../assets/icon';
import { useDarkMode } from '../../hooks';
import { toggleDarkMode } from '../../redux/reducers/globalSlice';

const DarkMode = () => {
    const globalOptions = useSelector((state) => state.global);
    const dispatch = useDispatch();
    const [darkMode, setDarkMode] = useDarkMode();

    const handleToggleDarkMode = () => {
        setDarkMode(!darkMode);
        dispatch(toggleDarkMode(!darkMode));
    };

    useEffect(() => {
        dispatch(toggleDarkMode(darkMode));
    }, []);
    return (
        <button
            className='flex justify-center items-center w-12 h-12 rounded-full border border-royal-blue  shadow-blue-500/50 dark:border-white dark:bg-white hover:animate-bounce '
            onClick={handleToggleDarkMode}
        >
            {darkMode ? <Moon /> : <Sun />}
        </button>
    );
};

export default DarkMode;
