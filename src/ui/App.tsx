import React from 'react';
import style from './App.module.css';
import {HashRouter} from "react-router-dom";
import {RoutesApp} from "./routes/RoutesApp";
import Header from "./header/Header";

function App() {
    return (
        <div className={style.appBlock}>
            <HashRouter>
                <Header/>
                <RoutesApp/>
            </HashRouter>
        </div>
    );
}

export default App;
