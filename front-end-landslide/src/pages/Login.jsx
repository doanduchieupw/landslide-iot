import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

import InputHook from '../components/Input/InputRHF';
import { loginRoute } from '../utils/APIRoutes';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/reducers/apiRequest';

const validationSchema = Yup.object({
    username: Yup.string()
        .min(6, 'The username must be at least 6 characters.')
        .max(20, 'The username must be less 20 characters.')
        .required('Required!'),
    password: Yup.string()
        .min(8, 'The password must be at least 8 characters.')
        .max(20, 'The password must be less 20 characters.')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'The password at least one letter and one number'
        )
        .required('Required!'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {
        handleSubmit,
        setFocus,
        control,
        formState: { errors, isSubmitting, isValid },
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

    const onSubmit =  (user) => {
        if (isValid) {
            const { username, password } = user;
            loginUser(user, dispatch, navigate);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-10 w-full max-w-[500px] mx-auto"
        >
            <div className="text-blue-500 text-3xl font-bold uppercase text-center mb-5">
                Login
            </div>
            <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="username">Username</label>
                <InputHook
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    control={control}
                ></InputHook>

                {errors?.username && (
                    <div className="text-red-500 text-sm">
                        {errors.username.message}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 mb-5">
                <label htmlFor="password">Password</label>
                <InputHook
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    control={control}
                ></InputHook>
                {errors?.password && (
                    <div className="text-red-500 text-sm">
                        {errors.password.message}
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="w-full mt-5 p-4 rounded-md bg-blue-600 text-white font-semibold"
            >
                {isSubmitting ? (
                    <div className="mx-auto w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    'Login'
                )}
            </button>
            <div className="mt-2 text-center text-gray-600">
                Don't have an account?{' '}
                <Link className="text-blue-600 underline italic" to="/register">
                    Sign up
                </Link>
            </div>
        </form>
    );
};

export default Login;
