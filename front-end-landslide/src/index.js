import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const engine = new Styletron();
root.render(
    <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </BaseProvider>
    </StyletronProvider>
);
