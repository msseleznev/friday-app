import React from 'react';
import style from "./Login.module.scss"
import paperStyle from "../../../ui/common/styles/classes.module.scss"
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../routes/RoutesApp";
import {loginTC} from "../../../bll/auth/login/login-reducer";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {InputText} from '../../common/InputText/InputText';
import {Button} from '../../common/Button/Button';
import {Preloader} from '../../common/Preloader/Preloader';
import {Checkbox} from '../../common/Checkbox/Checkbox';
import {useFormik} from 'formik';
import {LoginParamsType} from '../../../api/api';
import Logo from '../../../assets/images/Logo.png';


const LoginPage = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const isAppFetching = useAppSelector<boolean>(state => state.app.isAppFetching);
    const dispatch = useAppDispatch();
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
    });
    const emailFieldError = formik.errors.email && formik.touched.email ? formik.errors.email : '';
    const passwordFieldError = formik.errors.password && formik.touched.password ? formik.errors.password : '';
    if (isLoggedIn) {
        return <Navigate to={PATH.PACKS}/>
    }

    return (
        <div className={style.loginBlock}>
            <div className={`${style.loginContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                <div className={style.logoBlock}>
                    <img src={Logo} alt={'Logo'}/>
                </div>
                <form className={style.form}
                      onSubmit={formik.handleSubmit}>
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
                    <div className={style.checkboxField}>
                        <Checkbox {...formik.getFieldProps('rememberMe')}>
                            Remember me
                        </Checkbox>
                    </div>
                    <div className={style.loginButtonBlock}>
                        {isAppFetching ?
                            <Preloader size={'20px'} color={'#42A5F5'}/> :
                            <Button disabled={!!emailFieldError || !!passwordFieldError}
                                    type={'submit'}>
                                Login
                            </Button>}
                    </div>
                </form>
                <NavLink to={PATH.RECOVER} className={style.passwordLink}>
                    Forgot password?
                </NavLink>
                <NavLink to={PATH.REGISTRATION} className={style.registerLink}>
                    Create account
                </NavLink>
            </div>
        </div>
    );
};

export default LoginPage;