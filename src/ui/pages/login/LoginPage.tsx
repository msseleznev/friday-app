import React, {useState} from 'react';
import s from "./Login.module.css"
import testLogo from "../../../assets/images/TestLogo.png";
import {SuperInputText} from "../../common/superInputText/SuperInputText"
import {SuperButton} from "../../common/superButton/SuperButton";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesApp";


const LoginPage = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const emailError = email ? '' : 'enter email'
    const passwordError = password ? '' : 'enter password'
    const navigate = useNavigate()
    const singUpHandler = () => navigate(PATH.REGISTRATION)
    const recoverHandler = () => navigate(PATH.RECOVER)


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
                            onClick={recoverHandler}>
                        Forgot password
                    </button>
                    <SuperButton>
                        Login
                    </SuperButton>
                </form>
                <div>
                    Don't have an account?
                </div>
                <button className={s.button}
                        onClick={singUpHandler}>
                    Sing Up
                </button>
            </div>

        </div>
    );
};

export default LoginPage;