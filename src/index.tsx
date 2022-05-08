import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './ui/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./bll/store";


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);


reportWebVitals();
