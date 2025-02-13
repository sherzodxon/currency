import React from 'react';
import AppLayout from './layouts/App';
import './assets/scss/main.scss'
import {Provider} from 'react-redux';
import {store} from './store';
import CurrencyProvider from './contexts/currencyProvider';

function App() {
    return (
        <Provider store={store}>
            <CurrencyProvider>
                    <AppLayout/>
            </CurrencyProvider>

        </Provider>
    );
}

export default App;
