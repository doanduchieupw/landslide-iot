import DarkMode from '../DarkMode';
import Sidebar from '../Sidebar';

const Layout = ({ children }) => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='relative p-7 dark:bg-black-theme flex-1 h-screen'>
                {children}
                <div className='absolute bottom-3 right-3'>
                    <DarkMode />
                </div>
            </div>
        </div>
    );
};

export default Layout;
