import { Home, Register, Accelerometer, Login, Gyroscope, ContactPage, Rain, Temp, Faqs } from '../pages';

//Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/accelerometer', component: Accelerometer },
    { path: '/alert', component: Gyroscope },
    { path: '/rain', component: Rain },
    { path: '/temp-humi-mois', component: Temp },
    { path: '/register', component: Register, layout: 'none'},
    { path: '/login', component: Login, layout: 'none'},
    { path: '/faqs', component: Faqs,},
    { path: '/contact', component: ContactPage,},
    // { path: '/logout', },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
