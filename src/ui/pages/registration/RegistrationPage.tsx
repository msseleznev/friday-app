import React, {ChangeEvent, useState} from 'react';
import s from './Registration.module.css'
import testLogo from '../../../assets_images/images/TestLogo.png'
import SuperInputText from "../../common/ivanSuperInputText/SuperInputText";
import {SuperButton} from "../../common/superButton/SuperButton";

export const RegistrationPage = (() => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)


    return (
        <div className={s.registrationBlock}>
            <h2 className={s.title}>Sign up</h2>
            <div className={s.registrationContainer}>
                <img src={testLogo} className={s.logo} alt={'logo'}/>
                <div className={s.form}>
                    <span>Email</span>
                    <div>
                        <SuperInputText value={email} onChange={onChangeEmailHandler}/>
                    </div>
                    <span>Password</span>
                    <div>
                        <SuperInputText value={password} onChange={onChangePasswordHandler}/>
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

