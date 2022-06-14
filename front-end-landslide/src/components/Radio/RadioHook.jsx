import { useController } from 'react-hook-form';

const RadioHook = ({ control, ...props }) => {
    const { field } = useController({
        control,
        name: props.name,
    });
    return (
        <label
            className="custom-radio cursor-pointer"
        >
            <input type="radio" className="hidden" {...field} {...props} />
            <div className="bg-white w-full h-full rounded-full"></div>
        </label>
    );
};

export default RadioHook;
