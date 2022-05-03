import React, {useState} from 'react';
import s from "./Login.module.css"
import testLogo from "../../../assets/images/TestLogo.png";
import {SuperInputText} from "../../common/superInputText/SuperInputText"
import {SuperButton} from "../../common/superButton/SuperButton";
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesApp";
import {useAppSelector} from "../../../bll/store";
import {useDispatch} from "react-redux";
import {loginTC} from "../../../bll/auth/login/login-reducer";


const LoginPage = () => {

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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

        </div>
    );
};

export default LoginPage;