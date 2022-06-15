import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import { toggleDarkMode } from './redux/reducers/globalSlice';

export default function App() {
    const global = useSelector((state) => {
        console.log('🚀 ~ file: App.js ~ line 8 ~ global ~ state', state);
        return state.global;
    });
    const dispatch = useDispatch();
    console.log('🚀 ~ file: App.js ~ line 11 ~ global ~ global', global);
    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode(true));
    };
    return (
                <div className='flex'>
                    <Sidebar />
                    <Layout />
        
                    {/* <button className='w-12 h-9' onClick={handleToggleDarkMode}>
                        Toggle
                    </button> */}
                </div>
    );
}
