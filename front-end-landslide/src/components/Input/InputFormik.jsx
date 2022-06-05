import { Field, ErrorMessage } from 'formik';

const InputForm = ({ label, name, ...props }) => {
    return (
        <div className='flex flex-col gap-2 mb-5'>
            <label htmlFor={name}>{label}</label>
            <Field
                type={props.type || 'text'}
                name={name}
                id={name}
                spellCheck='false'
                className='p-4 rounded-md border border-gray-300 focus:border-blue-500'
                {...props}
            />
            <div className='text-red-500 text-sm'>
                <ErrorMessage name={name} />
            </div>
        </div>
    );
};

export default InputForm;
