import React from 'react';
import s from "./Recover.module.css";
import testLogo from "../../../assets/images/TestLogo.png";
import {SuperInputText} from "../../common/superInputText/SuperInputText";
import {SuperButton} from "../../common/superButton/SuperButton";

const RecoverPage = () => {
    return (
        <div className={s.recoverBlock}>
            <h2 className={s.title}>Forgot password</h2>
            <div className={s.recoverContainer}>
                <img src={testLogo} className={s.logo} alt={'logo'}/>

                <form className={s.form}>
                    <h4>Forgot your password?</h4>
                    <span>Email</span>
                    <SuperInputText type='email'
                        /*value={email}
                        onChangeText={setEmail}
                        error={emailError}*//>
                    <p>Enter your email address and we will send you further instructions </p>

                    <SuperButton>
                        Send instructions
                    </SuperButton>
                </form>
                <div>
                    Did you remember your password?
                </div>
                <button className={s.button}>
                    Try logging in
                </button>
            </div>

        </div>
    );
};

export default RecoverPage;