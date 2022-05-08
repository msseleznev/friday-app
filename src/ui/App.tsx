import React, {useEffect} from 'react';
import style from './App.module.css';
import {HashRouter} from "react-router-dom";
import {RoutesApp} from "./routes/RoutesApp";
import {initializeApp} from '../bll/app/app-reducer';
import {useAppDispatch, useAppSelector} from '../bll/hooks';
import {InitializePreloader} from './common/InitializePreloader/InitializePreloader';

function App() {
    const dispatch = useAppDispatch();
    const appIsInitialize = useAppSelector(state => state.app.appIsInitialize);
    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    if (!appIsInitialize) {
        return <InitializePreloader/>
    }
    return (
        <div className={style.appBlock}>
            <HashRouter>
                <RoutesApp/>
            </HashRouter>
        </div>
    );
}

export default App;
