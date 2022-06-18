import { Home, Register, Accelerometer, Login, Gyroscope } from '../pages';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/accelerometer', component: Accelerometer },
    { path: '/gyroscope', component: Gyroscope },
    { path: '/register', component: Register, layout: 'none'},
    { path: '/login', component: Login, layout: 'none'},
    // { path: '/logout', },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
