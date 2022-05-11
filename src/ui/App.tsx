import React, {useEffect} from 'react';
import style from './App.module.css';
import {HashRouter} from "react-router-dom";
import {RoutesApp} from "./routes/RoutesApp";
import {initializeApp} from '../bll/app/app-reducer';
import {useAppDispatch, useAppSelector} from '../bll/hooks';
import {InitializePreloader} from './common/InitializePreloader/InitializePreloader';
import {ErrorBar} from './common/ErrorBar/ErrorBar';
import {Header} from './header/Header';

function App() {
    const dispatch = useAppDispatch();
    const {appIsInitialize, appError} = useAppSelector(state => state.app);
    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    if (!appIsInitialize) {
        return <InitializePreloader/>
    }
    return (
        <div className={style.appBlock}>
            <Header/>
            <HashRouter>
                <RoutesApp/>
            </HashRouter>
            {appError && <ErrorBar error={appError}/>}
        </div>
    );
}

export default App;
