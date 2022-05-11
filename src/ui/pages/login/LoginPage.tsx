import React, {useState} from 'react';
import s from "./Login.module.css"
import testLogo from "../../../assets/images/TestLogo.png";
import {SuperInputText} from "../../common/superInputText/SuperInputText"
import {SuperButton} from "../../common/superButton/SuperButton";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesApp";
import {NullableType} from "../../../bll/store";
import {loginTC} from "../../../bll/auth/login/login-reducer";
import {ErrorBar} from '../../common/ErrorBar/ErrorBar';
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";


const LoginPage = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const appError = useAppSelector<NullableType<string>>(state => state.app.appError);
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState<string>('manchiko111@gmail.com')
    const [password, setPassword] = useState<string>('yoyoyo222')

    const emailError = email ? '' : 'enter email'
    const passwordError = password ? '' : 'enter password'

    const navigate = useNavigate()

    const redirectToSingUp = () => navigate(PATH.REGISTRATION)
    const redirectToRecover = () => navigate(PATH.RECOVER)
    const loginHandler = () => dispatch(loginTC({email, password, rememberMe: false}))


    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }


    return (
        <div className={s.loginBlock}>
            <h2 className={s.title}>Sign In</h2>
            <div className={s.loginContainer}>
                <img src={testLogo} className={s.logo} alt={'logo'}/>
                <form className={s.form}>
                    <span>Email</span>
                    <SuperInputText type='email'
                                    value={email}
                                    onChangeText={setEmail}
                                    error={emailError}/>
                    <span>Password</span>
                    <SuperInputText type='password'
                                    value={password}
                                    onChangeText={setPassword}
                                    error={passwordError}/>
                    <button className={s.button}
                            onClick={redirectToRecover}>
                        Forgot password
                    </button>
                    <SuperButton disabled={email === '' || password === ''} onClick={loginHandler}>
                        Login
                    </SuperButton>
                </form>
                <div>
                    Don't have an account?
                </div>
                <button className={s.button}
                        onClick={redirectToSingUp}>
                    Sing Up
                </button>
            </div>
            {appError && <ErrorBar error={appError}/>}
        </div>
    );
};

export default LoginPage;