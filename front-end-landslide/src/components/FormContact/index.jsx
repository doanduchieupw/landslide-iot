import { useRef } from 'react'
import emailjs from "@emailjs/browser";
import { useSelector } from 'react-redux';
import { useState } from 'react';
const FormContact = () => {
    const user = useSelector((state) => state.auth?.login?.currentUser);
    const [usernameInput, setUsernameInput] = useState(user.username)
    const [emailInput, setEmailInput] = useState(user.email)
    const [state, setState] = useState()
    
    const form = useRef();
    const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_yrrpr8c",
        "template_gz549y8",
        form.current,
        "HzruQz4oXMKazm8F9"
      )
      .then(
        (result) => {
          if(result.text) {
            setUsernameInput('')
            setEmailInput('')
            setState("Success!!!")
          }
        },
        (error) => {
          console.log(error.text);
          setState("Fail!!!")
        }
      );
  };
    return (
        <div className="w-3/4 mx-auto">
            <h1 className="text-3xl text-center text-royal-blue font-bold">Contact to Admin</h1>
            <form ref={form} onSubmit={sendEmail}>
            <div className='mb-6'>
                    <label
                        htmlFor='username'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                        Username
                    </label>
                    <input
                        type='text'
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        id='username'
                        name='user_name'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Enter your username'
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label
                        htmlFor='email'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                        Your email
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        name='user_email'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='name@gmail.com'
                        required
                    />
                </div>
    
                <label
                    htmlFor='message'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
                >
                    Your message
                </label>
                <textarea
                    id='message'
                    name='message'
                    rows='4'
                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6'
                    placeholder='Leave a message...'
                ></textarea>
    
                <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Submit
                </button>
                {state && <div className='mt-2 text-royal-blue font-bold'>{state}</div>}
            </form>
        </div>
    );
};

export default FormContact;
