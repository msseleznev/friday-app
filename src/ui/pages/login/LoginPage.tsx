import React, {useState} from 'react';
import style from "./Login.module.scss"
import paperStyle from "../../../ui/common/styles/classes.module.scss"
import testLogo from "../../../assets/images/TestLogo.png";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../routes/RoutesApp";
import {loginTC} from "../../../bll/auth/login/login-reducer";
import {ErrorBar} from '../../common/ErrorBar/ErrorBar';
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {InputText} from '../../common/InputText/InputText';
import {Button} from '../../common/Button/Button';
import {Preloader} from '../../common/Preloader/Preloader';


const LoginPage = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const {appError, isAppFetching} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const emailError = email ? '' : 'enter email'
    const passwordError = password ? '' : 'enter password'
    const loginHandler = () => dispatch(loginTC({email, password, rememberMe: false}))


    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (

        <div className={style.loginBlock}>
            <div className={`${style.loginContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                <img src={testLogo} className={style.logo} alt={'logo'}/>
                <form className={style.form}>
                    <InputText type='email'
                               value={email}
                               onChangeText={setEmail}
                               error={emailError}/>
                    <InputText type='password'
                               value={password}
                               onChangeText={setPassword}
                               error={passwordError}/>
                    <div className={style.loginButtonBlock}>
                        {isAppFetching ?
                            <Preloader size={'20px'} color={'#42A5F5'}/> :
                            <Button disabled={email === '' || password === ''} onClick={loginHandler}>
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
            {appError && <ErrorBar error={appError}/>}
        </div>
    );
};

export default LoginPage;