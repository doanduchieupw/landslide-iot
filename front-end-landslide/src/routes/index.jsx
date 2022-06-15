import { Home, Register, Accelerometer, Login } from '../pages';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/accelerometer', component: Accelerometer },
    { path: '/register', component: Register, layout: 'none'},
    { path: '/login', component: Login, layout: 'none'},
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
