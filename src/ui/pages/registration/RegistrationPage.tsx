import React from 'react';
import s from './Registration.module.css'
import testLogo from '../../../assets_images/images/TestLogo.png'
import SuperInputText from "../../common/ivanSuperInputText/SuperInputText";
import {SuperButton} from "../../common/superButton/SuperButton";

export const RegistrationPage = (() => {
    return (
        <div className={s.registrationBlock}>
            <h2 className={s.title}>Sign up</h2>
            <div className={s.registrationContainer}>
                <img src={testLogo} className={s.logo} alt={'logo'}/>
                <div className={s.form}>
                    <span>Email</span>
                    <div>
                        <SuperInputText/>
                    </div>
                    <span>Password</span>
                    <div>
                        <SuperInputText/>
                    </div>
                    <div className={s.buttons}>
                        <SuperButton>
                            Cancel
                        </SuperButton>
                        <SuperButton>Register</SuperButton>
                    </div>
                </div>
            </div>

        </div>
    );
})

