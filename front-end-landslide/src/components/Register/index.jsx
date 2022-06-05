import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(20, 'Must be less 20 character')
                .required('Required!'),
            lastName: Yup.string()
                .max(20, 'Must be less 20 character')
                .required('Required!'),
        }),
        onSubmit: (values) => {
            console.log('values', values);
        },
    });
    console.log('formik', formik);
    return (
        <form
            onSubmit={formik.handleSubmit}
            className='p-10 w-full max-w-[500px] mx-auto'
        >
            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor='firstName'>First name</label>
                <input
                    type='text'
                    id='firstName'
                    placeholder='Enter your first name'
                    className='p-4 rounded-md border border-gray-200'
                    {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                    <div className='text-red-600 text-sm'>
                        {formik.errors.firstName}
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor='lastName'>Last name</label>
                <input
                    type='text'
                    id='lastName'
                    placeholder='Enter your last name'
                    className='p-4 rounded-md border border-gray-200'
                    {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                    <div className='text-red-600 text-sm'>
                        {formik.errors.lastName}
                    </div>
                )}
            </div>
            <button
                type='submit'
                className='w-full p-4 bg-blue-600 text-white font-semibold'
            >
                Submit
            </button>
        </form>
    );
};

export default Register;
