import React, {useEffect} from 'react';
import style from "./Recover.module.scss";
import {PATH} from "../../routes/RoutesApp";
import {Navigate, NavLink} from "react-router-dom";
import {recoverTC, setSentInstruction} from "../../../bll/auth/recover/recover-reducer";
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import paperStyle from '../../common/styles/classes.module.scss';
import {Logo} from '../../common/Logo/Logo';
import {InputText} from '../../common/InputText/InputText';
import {Button} from '../../common/Button/Button';
import {Preloader} from '../../common/Preloader/Preloader';
import {useFormik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelopeCircleCheck} from '@fortawesome/free-solid-svg-icons/faEnvelopeCircleCheck';


const RecoverPage = () => {
        const isSentInstructions = useAppSelector(state => state.recover.isSentInstructions);
        const isAppFetching = useAppSelector<boolean>(state => state.app.isAppFetching);
        const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn);
        const dispatch = useAppDispatch();
        useEffect(() => {
            return () => {
                dispatch(setSentInstruction(false))
            }
        }, []);
        const formik = useFormik({
            initialValues: {
                email: ''
            } as { email: string },
            onSubmit: (values: { email: string }) => {
                dispatch(recoverTC(values.email))
            },
            validate: (values: { email: string }) => {
                const errors = {} as { email: string };
                if (!values.email) {
                    errors.email = 'Field is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }
        });
        const emailFieldError = formik.errors.email && formik.touched.email ? formik.errors.email : '';
        if (isLoggedIn) {
            return <Navigate to={PATH.PACKS}/>
        }
        return (
            <div className={style.recoverBlock}>
                <div className={`${style.recoverContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                    <div className={style.logo}>
                        <Logo style={{width: '80px', height: '80px'}}/>
                        <div className={style.title}>
                            <h1>Cards</h1>
                            <span>learning</span>
                        </div>
                    </div>
                    {isSentInstructions
                        ? <div className={style.form}>
                            <FontAwesomeIcon className={style.emailCheck} icon={faEnvelopeCircleCheck}/>
                            <h2>Check email</h2>
                            <p>We've sent an Email with instructions to
                                <span className={style.email}> {formik.values.email}</span>
                            </p>
                        </div>
                        :
                        <>
                            <form className={style.form}
                                  onSubmit={formik.handleSubmit}>
                                <h4>Forgot your password?</h4>
                                <p>Enter your email address and we will send you further instructions </p>
                                <InputText type='email'
                                           error={emailFieldError}
                                           placeholder={'Email'}
                                           className={style.inputField}
                                           {...formik.getFieldProps('email')}/>
                                <div className={style.button}>
                                    {isAppFetching ?
                                        <Preloader size={'20px'} color={'#42A5F5'}/> :
                                        <Button disabled={!!emailFieldError}
                                                type={'submit'}>
                                            Send instructions
                                        </Button>}
                                </div>
                            </form>
                            <p>Did you remember your password?</p>
                            <NavLink to={PATH.LOGIN} className={style.loginLink}>
                                Try logging in
                            </NavLink>
                        </>
                    }
                </div>
            </div>
        );
    }
;

export default RecoverPage;
