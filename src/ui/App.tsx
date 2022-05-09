import React, {useEffect} from 'react';
import style from './App.module.css';
import {HashRouter} from "react-router-dom";
import {RoutesApp} from "./routes/RoutesApp";
import Header from "./header/Header";
import {initializeApp} from '../bll/app/app-reducer';
import {useAppDispatch, useAppSelector} from '../bll/hooks';

function App() {
    const dispatch = useAppDispatch();
    const appIsInitialize = useAppSelector(state => state.app.appIsInitialize);
    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    if (!appIsInitialize) {
        return (
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h2>Loading...</h2>
            </div>
        )
    }
    return (
        <div className={style.wrapper}>
            <div className={style.appBlock}>
                <HashRouter>
                    <Header/>
                    <RoutesApp/>
                </HashRouter>
            </div>
        </div>

    );
}

export default App;
