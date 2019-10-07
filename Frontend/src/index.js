import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM, {unmountComponentAtNode} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {createBrowserHistory} from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {AppContainer} from 'react-hot-loader'
//css
import './App.css';
import './index.css';
//import 'bootstrap/dist/css/bootstrap-theme.min.css' ;

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({basename: baseUrl});

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

if (module.hot) {
    module.hot.accept('./App', () => {
        let App = require('./App').default();
        unmountComponentAtNode(document.getElementById('root'));
        rerender(App)
    })
}

function rerender(App) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        rootElement)
}

rerender(App);

registerServiceWorker();
