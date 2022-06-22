import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';

import { InputHook, RadioHook } from '../components';
import { registerRoute } from '../utils/APIRoutes';
import CheckMark from '../assets/checkmark.gif';
import { registerUser } from '../redux/reducers/apiRequest';
import { useDispatch } from 'react-redux';

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
    passwordConfirm: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
    ),
    email: Yup.string().email('Invalid email address').required('Required'),
});

const Register = () => {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        setError,
        control,
        formState: { errors, isSubmitting, isValid },
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = (user) => {
        if (isValid) {
            registerUser(user, dispatch, navigate).then((res) => {
                if (res?.error) {
                    setError(res.type, {
                        type: 'custom',
                        message: res.message,
                    });
                } else {
                    console.log(res);
                    setIsSuccess(true);
                }
            });
        }
    };

    return (
        <>
            {isSuccess ? (
                <div className='w-full h-[100vh] flex justify-center items-center'>
                    <img src={CheckMark} alt='Success' />
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='p-10 w-full max-w-[500px] mx-auto'
                >
                    <div className='text-blue-500 text-3xl font-bold uppercase text-center mb-5'>
                        Sign up
                    </div>
                    <div className='flex flex-col gap-2 mb-5'>
                        <label htmlFor='username'>Username</label>
                        <InputHook
                            name='username'
                            id='username'
                            autoFocus={true}
                            placeholder='Enter your username'
                            control={control}
                        />

                        {errors?.username && (
                            <div className='text-red-500 text-sm'>
                                {errors.username.message}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 mb-5'>
                        <label htmlFor='email'>Email address</label>
                        <InputHook
                            name='email'
                            id='email'
                            type='email'
                            placeholder='Enter your email'
                            control={control}
                        />
                        {errors?.email && (
                            <div className='text-red-500 text-sm'>
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 mb-5'>
                        <label>Gender</label>
                        <div className='flex items-center gap-5'>
                            <div className='flex items-center gap-x-3 ml-4'>
                                <RadioHook
                                    control={control}
                                    name='gender'
                                    value='male'
                                ></RadioHook>
                                <span forhtml='male'>Male</span>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <RadioHook
                                    control={control}
                                    name='gender'
                                    value='female'
                                ></RadioHook>
                                <span forhtml='female'>Female</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mb-5'>
                        <label htmlFor='password'>Password</label>
                        <InputHook
                            name='password'
                            id='password'
                            type='password'
                            placeholder='Password'
                            control={control}
                        />
                        {errors?.password && (
                            <div className='text-red-500 text-sm'>
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 mb-5'>
                        <label htmlFor='passwordConfirm'>
                            Confirm password
                        </label>
                        <InputHook
                            name='passwordConfirm'
                            id='passwordConfirm'
                            type='password'
                            placeholder='Confirm password'
                            control={control}
                        />
                        {errors?.passwordConfirm && (
                            <div className='text-red-500 text-sm'>
                                {errors.passwordConfirm.message}
                            </div>
                        )}
                    </div>
                    <button
                        type='submit'
                        className='w-full mt-5 p-4 rounded-md bg-blue-600 text-white font-semibold'
                    >
                        {isSubmitting ? (
                            <div className='mx-auto w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                    <div className='mt-2 text-center text-gray-600'>
                        Already have an account ?{' '}
                        <Link
                            className='text-blue-600 underline italic'
                            to='/login'
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            )}
        </>
    );
};

export default Register;
