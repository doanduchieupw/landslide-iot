import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    username: Yup.string()
        .min(6, 'The username must be at least 6 characters.')
        .max(20, 'The username must be less 20 characters.')
        .required('Required!'),
    password: Yup.string()
        .min(8, 'The password must be at least 8 characters.')
        .max(20, 'The password must be less 20 characters.')
        .required('Required!'),
    // passwordConfirm: Yup.string().oneOf(
    //     [Yup.ref('password'), null],
    //     'Passwords must match'
    // ),
    // email: Yup.string().email('Invalid email address').required('Required'),
});

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
    console.log(
        '🚀 ~ file: RegisterRHF.jsx ~ line 28 ~ Register ~ isValid',
        isValid
    );

    const onSubmit = (values) => {
        if(isValid) {
            console.log('Send data to backend');
        }
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve();
        //         console.log(values);
        //     }, 5000);
        // });
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='p-10 w-full max-w-[500px] mx-auto'
        >
            <div className='text-blue-500 text-3xl font-bold uppercase text-center mb-5'>
                Sign in
            </div>
            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    spellCheck='false'
                    className='p-4 rounded-md border border-gray-300 focus:border-blue-500'
                    placeholder='Enter your username'
                    {...register('username')}
                />
                {errors?.username && (
                    <div className='text-red-500 text-sm'>
                        {errors.username.message}
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    spellCheck='false'
                    className='p-4 rounded-md border border-gray-300 focus:border-blue-500'
                    placeholder='Password'
                    {...register('password')}
                />
                {errors?.password && (
                    <div className='text-red-500 text-sm'>
                        {errors.password.message}
                    </div>
                )}
            </div>
            {/* <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor='passwordConfirm'>Confirm password</label>
                <input
                    type='password'
                    spellCheck='false'
                    className='p-4 rounded-md border border-gray-300 focus:border-blue-500'
                    placeholder='Confirm password'
                    {...register('passwordConfirm')}
                />
                {errors?.passwordConfirm && (
                    <div className='text-red-500 text-sm'>
                        {errors.passwordConfirm.message}
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    spellCheck='false'
                    className='p-4 rounded-md border border-gray-300 focus:border-blue-500'
                    placeholder='Enter your email'
                    {...register('email')}
                />
                {errors?.email && (
                    <div className='text-red-500 text-sm'>
                        {errors.email.message}
                    </div>
                )}
            </div> */}
            <button
                type='submit'
                className='w-full p-4 rounded-md bg-blue-600 text-white font-semibold'
            >
                {isSubmitting ? (
                    <div className='mx-auto w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                ) : (
                    'Sign In'
                )}
            </button>
        </form>
    );
};

export default Register;
