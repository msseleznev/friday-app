import React, {ChangeEvent, useState} from 'react';
import style from './Registration.module.scss'
import {SuperButton} from "../../common/superButton/SuperButton";
import {useNavigate} from "react-router-dom";
import {registerTC, setRedirectToLoginAC} from "../../../bll/auth/registration/registration-reducer";
import {PATH} from "../../routes/RoutesApp";
import {ErrorBar} from '../../common/ErrorBar/ErrorBar';
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {InputText} from '../../common/InputText/InputText';
import {useFormik} from 'formik';
import {LoginParamsType} from '../../../api/api';
import {loginTC} from '../../../bll/auth/login/login-reducer';
import paperStyle from '../../common/styles/classes.module.scss';


export const RegistrationPage = (() => {
    const redirectToLogin = useAppSelector(state => state.registration.redirectToLogin)
    const appError = useAppSelector(state => state.app.appError);
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const dispatch = useAppDispatch()
    let navigate = useNavigate();


    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
    const onChangePassword2Handler = (e: ChangeEvent<HTMLInputElement>) => setPassword2(e.currentTarget.value)
    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
    const sendUserInfoOnclickButton = () => dispatch(registerTC(email, password))

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        } as LoginParamsType,
        onSubmit: (values: LoginParamsType) => {
            dispatch(loginTC(values))
        },
        validate: (values: LoginParamsType) => {
            const errors = {} as LoginParamsType;
            if (!values.email) {
                errors.email = 'Field is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Field is required';
            }
            return errors;

        }
    })
    if (redirectToLogin) {
        navigate(PATH.LOGIN)
        dispatch(setRedirectToLoginAC(false))
    }


    return (
        <div className={style.registrationBlock}>
            <div className={`${style.registrationContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                <h2 className={style.title}>Sign up</h2>
                <form onSubmit={formik.handleSubmit}>
                    <InputText type='email'
                               error={''}
                               placeholder={'Email'}
                               className={style.inputField}
                               {...formik.getFieldProps('email')}/>
                    <InputText type='password'
                               error={''}
                               placeholder={'Password'}
                               className={style.inputField}
                               {...formik.getFieldProps('password')}/>
                    <InputText type='password'
                               error={''}
                               placeholder={'Retype password'}
                               className={style.inputField}
                               {...formik.getFieldProps('password')}/>
                    <div className={style.checkboxField}>
                        <div className={style.buttons}>
                            <SuperButton onClick={() => navigate(PATH.LOGIN)}>
                                To Login page
                            </SuperButton>
                            <SuperButton onClick={sendUserInfoOnclickButton}>Sign Up</SuperButton>
                        </div>
                    </div>
                </form>
            </div>
            {appError && <ErrorBar error={appError}/>}
        </div>
    );
})

