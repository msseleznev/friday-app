import React from 'react';
import s from "./Login.module.css"
import testLogo from "../../../assets/images/TestLogo.png";
import {SuperInputText} from "../../common/superInputText/SuperInputText"
import {SuperButton} from "../../common/superButton/SuperButton";


const LoginPage = () => {


    return (
        <div className={s.loginBlock}>
            <h2 className={s.title}>Sign In</h2>
            <div className={s.loginContainer}>
                <img src={testLogo} className={s.logo} alt={'logo'}/>
                <form className={s.form}>
                    <span>Email</span>
                        <SuperInputText/>
                    <span>Password</span>
                        <SuperInputText/>
                    <button className={s.button}>Forgot password</button>
                    <SuperButton>
                        Login
                    </SuperButton>
                </form>
                <div>
                    Don't have an account?
                </div>
                <button className={s.button}>Sing Up</button>
            </div>

        </div>
    );
};

export default LoginPage;