import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './ui/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./bll/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <Provider store={store}>
            <App/>
        </Provider>
);


reportWebVitals();
