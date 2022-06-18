import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { publicRoutes, privateRoutes } from './routes';

const Routers = () => {
    return (
        <Routes>
            {publicRoutes.map((route, index) => {
                const Page = route?.component || <></>;
                let LayoutMain = Layout
                if (route.layout === 'none') {
                    LayoutMain = Fragment
                }

                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <LayoutMain>
                                <Page />
                            </LayoutMain>
                        }
                    />
                );
            })}
            <Route path='/logout' />
        </Routes>
    );
};

export default Routers;
