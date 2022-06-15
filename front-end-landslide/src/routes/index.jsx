import { Home, } from '~/pages';
import { HeaderOnly } from '~/Components/Layout';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    // { path: '/', component: Home },

];
const privateRoutes = [];

export { publicRoutes, privateRoutes };