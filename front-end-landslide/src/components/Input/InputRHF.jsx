import { useController } from 'react-hook-form';

const InputHook = ({ control, ...props }) => {
    const { field } = useController({
        control,
        name: props.name,
        defaultValue: '',
    });
    return (
        <input
            className="p-4 rounded-md border border-gray-300 transition-all focus:border-blue-500"
            spellCheck='false'
            {...field}
            {...props}
        ></input>
    );
};

export default InputHook;
