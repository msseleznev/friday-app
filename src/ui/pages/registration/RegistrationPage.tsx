import React, {useEffect} from 'react';
import style from './Registration.module.scss'
import {Navigate, NavLink} from "react-router-dom";
import {registerTC, setRedirectToLoginAC} from "../../../bll/auth/registration/registration-reducer";
import {PATH} from "../../routes/RoutesApp";
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {InputText} from '../../common/InputText/InputText';
import {useFormik} from 'formik';
import {LoginParamsType} from '../../../api/api';
import paperStyle from '../../common/styles/classes.module.scss';
import {Button} from '../../common/Button/Button';
import {Preloader} from '../../common/Preloader/Preloader';
import {Logo} from '../../common/Logo/Logo';

type RegisterValuesType = Omit<LoginParamsType, 'rememberMe'> & { confirmPassword: string }
export const RegistrationPage = (() => {
    const redirectToLogin = useAppSelector(state => state.registration.redirectToLogin)
    const isAppFetching = useAppSelector<boolean>(state => state.app.isAppFetching);
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setRedirectToLoginAC(false))
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        } as RegisterValuesType,
        onSubmit: (values: RegisterValuesType) => {
            const {email, password} = values;
            dispatch(registerTC(email, password));
        },
        validate: (values: RegisterValuesType) => {
            const errors = {} as RegisterValuesType;
            if (!values.email) {
                errors.email = 'Field is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Field is required';
            } else if (values.password.length < 7) {
                errors.password = 'The password field must be at least 6 characters'
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Field is required'
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'The password confirmation does not match'
            }
            return errors;

        }
    });
    const emailFieldError = formik.errors.email && formik.touched.email ? formik.errors.email : '';
    const passwordFieldError = formik.errors.password && formik.touched.password ? formik.errors.password : '';
    const confirmPasswordFieldError = formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : '';
    const registerButtonDisabled =
        emailFieldError ||
        passwordFieldError ||
        confirmPasswordFieldError;

    if (redirectToLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }
    if (isLoggedIn) {
        return <Navigate to={PATH.PACKS}/>
    }
    return (
        <div className={style.registrationBlock}>
            <div className={`${style.registrationContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                <div className={style.logo}>
                    <Logo style={{width: '80px', height: '80px'}}/>
                    <div className={style.title}>
                        <h1>Cards</h1>
                        <span>learning</span>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <InputText type='email'
                               error={emailFieldError}
                               placeholder={'Email'}
                               className={style.inputField}
                               {...formik.getFieldProps('email')}/>
                    <InputText type='password'
                               error={passwordFieldError}
                               placeholder={'Password'}
                               className={style.inputField}
                               {...formik.getFieldProps('password')}/>
                    <InputText type='password'
                               error={confirmPasswordFieldError}
                               placeholder={'Confirm password'}
                               className={style.inputField}
                               {...formik.getFieldProps('confirmPassword')}/>
                    <div className={style.checkboxField}>
                        <div className={style.buttons}>
                            {isAppFetching ?
                                <Preloader size={'20px'} color={'#42A5F5'}/> :
                                <Button type={'submit'}
                                        disabled={!!registerButtonDisabled}>
                                    Register
                                </Button>}
                        </div>
                    </div>
                </form>
                <span><span>Do you have an account?</span>
                    <NavLink to={PATH.LOGIN} className={style.loginLink}>
                        Login
                    </NavLink>
                </span>
            </div>
        </div>
    );
})

