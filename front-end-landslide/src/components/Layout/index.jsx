import Sidebar from "../Sidebar";

const Layout = ({children}) => {
    return ( <div className="layout-container flex">
        <Sidebar />
        <main className='p-24'>{children}</main>
    </div> );
}
 
export default Layout;