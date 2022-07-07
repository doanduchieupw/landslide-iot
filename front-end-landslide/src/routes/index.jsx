import { Home, Register, Accelerometer, Login, Gyroscope, Contact, Rain } from '../pages';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/accelerometer', component: Accelerometer },
    { path: '/gyroscope', component: Gyroscope },
    { path: '/rain', component: Rain },
    { path: '/register', component: Register, layout: 'none'},
    { path: '/login', component: Login, layout: 'none'},
    { path: '/contact', component: Contact,},
    // { path: '/logout', },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
