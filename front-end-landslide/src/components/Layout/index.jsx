import Sidebar from "../Sidebar";

const Layout = ({children}) => {
    return ( <div className="flex">
        <Sidebar />
        <div className="p-7 text-2xl font-semibold flex-1 h-screen">{children}</div>
    </div> );
}
 
export default Layout;