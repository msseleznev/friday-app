import React, {useEffect} from 'react';
import style from "./NewPassword.module.scss";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {PATH} from "../../routes/RoutesApp";
import {saveNewPasswordTC} from "../../../bll/auth/newPassword/new-password-reducer";
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {Logo} from '../../common/Logo/Logo';
import {InputText} from '../../common/InputText/InputText';
import {useFormik} from 'formik';
import {Button} from '../../common/Button/Button';
import paperStyle from '../../common/styles/classes.module.scss';
import {setSentInstruction} from '../../../bll/auth/recover/recover-reducer';
import {Preloader} from '../../common/Preloader/Preloader';

type NewPasswordValuesType = {
    password: string
    confirmPassword: string
}
const NewPasswordPage = () => {
    const isAppFetching = useAppSelector<boolean>(state => state.app.isAppFetching);
    const isNewPasswordSet = useAppSelector(state => state.newPassword.isNewPasswordSet);
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn);
    const dispatch = useAppDispatch()
    useEffect(() => {
        return () => {
            dispatch(setSentInstruction(false))
        }
    }, []);
    const params = useParams<'*'>()
    const resetPasswordToken = params["*"]

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        } as NewPasswordValuesType,
        onSubmit: (values: NewPasswordValuesType) => {
            const password = values.password;
            if (resetPasswordToken) {
                dispatch(saveNewPasswordTC({password, resetPasswordToken}))
            }
        },
        validate: (values: NewPasswordValuesType) => {
            const errors = {} as NewPasswordValuesType;
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
    const passwordFieldError = formik.errors.password && formik.touched.password ? formik.errors.password : '';
    const confirmPasswordFieldError = formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : '';
    const setPasswordButtonDisabled =
        passwordFieldError ||
        confirmPasswordFieldError;
    if (isLoggedIn) {
        return <Navigate to={PATH.PACKS}/>
    }
    return (
        <div className={style.newPasswordBlock}>
            <div className={`${style.newPasswordContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                <div className={style.logo}>
                    <Logo style={{width: '80px', height: '80px'}}/>
                    <div className={style.title}>
                        <h1>Cards</h1>
                        <span>learning</span>
                    </div>
                </div>
                {isNewPasswordSet
                    ? <div className={style.form}>
                        <h3>The new password has been successfully set.</h3>
                        <NavLink to={PATH.LOGIN} className={style.loginLink}>
                            Login with new password
                        </NavLink>
                    </div>
                    : <form className={style.form}
                            onSubmit={formik.handleSubmit}>
                        <p>Enter new password</p>
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
                        <div className={style.buttons}>
                            {isAppFetching ?
                                <Preloader size={'20px'} color={'#42A5F5'}/> :
                                <Button type={'submit'}
                                        disabled={!!setPasswordButtonDisabled}>
                                    Set new password
                                </Button>}
                        </div>
                    </form>}

            </div>
        </div>
    );
};

export default NewPasswordPage;