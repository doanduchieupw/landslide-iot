import { useState } from 'react';
import { FormContact } from '../components';
import Contact from './Contact';

const ContactPage = () => {
    const [modeContact, setModeContact] = useState();
    return (
        <>
            {!modeContact && (
                <div className='flex flex-col justify-center items-center gap-y-4 h-full'>
                    <h1 className='font-bold text-6xl capitalize mb-6 '>CONTACT METHODS</h1>
                    <div className='bg-royal-blue text-white w-3/12 px-5 py-5 rounded-md cursor-pointer hover:opacity-75' onClick={() => setModeContact('email')}>Contact with email</div>
                    <div className='bg-royal-blue text-white w-3/12 px-5 py-5 rounded-md cursor-pointer hover:opacity-75' onClick={() => setModeContact('direct')}>Contact with message</div>
                </div>
            )}
            {
                modeContact === 'email' && <FormContact /> 
            }
            {
                modeContact === 'direct' && <Contact /> 
            }
        </>
    );
};

export default ContactPage;
