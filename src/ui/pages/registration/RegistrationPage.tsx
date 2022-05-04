import React, {ChangeEvent, useState} from 'react';
import s from './Registration.module.css'
import testLogo from '../../../assets/images/TestLogo.png'
import SuperInputText from "../../common/ivanSuperInputText/SuperInputText";
import {SuperButton} from "../../common/superButton/SuperButton";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerTC, setRedirectToLoginAC} from "../../../bll/auth/registration/registration-reducer";
import {AppStateType} from "../../../bll/store";
import {PATH} from "../../routes/RoutesApp";

export const RegistrationPage = (() => {
    const redirectToLogin = useSelector<AppStateType, boolean>(state => state.registration.redirectToLogin)
    const error = useSelector<AppStateType, string>(state => state.registration.error)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const dispatch = useDispatch()
    let navigate = useNavigate();


    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
    const onChangePassword2Handler = (e: ChangeEvent<HTMLInputElement>) => setPassword2(e.currentTarget.value)
    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    const sendUserInfoOnclickButton = () => dispatch(registerTC(email, password, password2))

    if (redirectToLogin) {
        navigate(PATH.LOGIN)
        dispatch(setRedirectToLoginAC(false))
    }

 //hi Vlad

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
                        <SuperInputText type={password} value={password} onChange={onChangePasswordHandler}/>
                    </div>
                    <span>Repeat password</span>
                    <div>
                        <SuperInputText type={password} value={password2} onChange={onChangePassword2Handler}/>
                    </div>
                    <div className={s.buttons}>
                        <SuperButton onClick={() => navigate(PATH.LOGIN)}>
                            To Login page
                        </SuperButton>
                        <SuperButton onClick={sendUserInfoOnclickButton}>Sign Up</SuperButton>
                        <div>{error}</div>
                    </div>
                </div>
            </div>

        </div>
    );
})

