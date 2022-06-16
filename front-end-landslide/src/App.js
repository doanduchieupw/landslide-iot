import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './redux/reducers/globalSlice';
import Routers from './Routers';

export default function App() {
    const global = useSelector((state) => state.global);
    console.log('🚀 ~ file: App.js ~ line 12 ~ App ~ global', global);
    const dispatch = useDispatch();
    console.log('🚀 ~ file: App.js ~ line 11 ~ global ~ global', global);
    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode(true));
    };
    return (
        <div>
            {/* <Routers /> */}
            <button className="w-12 h-9" onClick={handleToggleDarkMode}>
                Toggle
            </button>
        </div>
    );
}
