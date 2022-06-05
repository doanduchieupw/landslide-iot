import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { InputForm } from '../components';

const Register = () => {
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                passwordConfirm: '',
                email: '',
                // phone: null,
            }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .min(6, 'The username must be at least 6 characters.')
                    .max(20, 'The username must be less 20 characters.')
                    .required('Required!'),
                password: Yup.string()
                    .min(8, 'The password must be at least 8 characters.')
                    .max(20, 'The password must be less 20 characters.')
                    .required('Required!'),
                passwordConfirm: Yup.string().oneOf(
                    [Yup.ref('password'), null],
                    'Passwords must match'
                ),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
            })}
            onSubmit={(values) => {
                console.log('values', values);
            }}
        >
            <div className='p-10 w-full max-w-[500px] mx-auto'>
                <div className='text-blue-500 text-3xl font-bold uppercase text-center mb-5'>
                    Sign in
                </div>
                <Form>
                    <InputForm
                        label='Username'
                        name='username'
                        placeholder='Enter your username'
                    ></InputForm>
                    <InputForm
                        label='Password'
                        name='password'
                        type='password'
                        placeholder='Password'
                    ></InputForm>
                    <InputForm
                        label='Confirm password'
                        name='passwordConfirm'
                        type='password'
                        placeholder='Confirm password'
                    ></InputForm>
                    <InputForm
                        label='Email'
                        name='email'
                        type='email'
                        placeholder='Enter your email'
                    ></InputForm>
                    <button
                        type='submit'
                        className='w-full p-4 rounded-md bg-blue-600 text-white font-semibold'
                    >
                        Sign In
                    </button>
                </Form>
            </div>
        </Formik>
    );
};

export default Register;
