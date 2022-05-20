import React, {useEffect} from 'react';
import style from './App.module.scss';
import {HashRouter} from "react-router-dom";
import {RoutesApp} from "./routes/RoutesApp";
import {initializeApp} from '../bll/app/app-reducer';
import {useAppDispatch, useAppSelector} from '../bll/hooks';
import {InitializePreloader} from './common/InitializePreloader/InitializePreloader';
import {SNACK_BAR_TYPES, SnackBar} from './common/SnackBar/SnackBar';
import {Header} from './header/Header';

function App() {
    const dispatch = useAppDispatch();
    const {appIsInitialize, appError, appMessage} = useAppSelector(state => state.app);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])
    if (!appIsInitialize) {
        return <InitializePreloader/>
    }
    return (
        <div className={style.appBlock}>
            <HashRouter>
                {isLoggedIn && <Header/>}
                <div className={style.content}>
                    <RoutesApp/>
                </div>
            </HashRouter>
            {appError && <SnackBar message={appError} type={SNACK_BAR_TYPES.ERROR}/>}
            {appMessage && <SnackBar message={appMessage} type={SNACK_BAR_TYPES.SUCCESS}/>}
        </div>
    );
}

export default App;
