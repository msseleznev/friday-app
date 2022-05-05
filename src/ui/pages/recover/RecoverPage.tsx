import React, {useState} from 'react';
import s from "./Recover.module.css";
import testLogo from "../../../assets/images/TestLogo.png";
import {SuperInputText} from "../../common/superInputText/SuperInputText";
import {SuperButton} from "../../common/superButton/SuperButton";
import {PATH} from "../../routes/RoutesApp";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../bll/store";
import {useDispatch} from "react-redux";
import {recoverTC, setSentInstruction} from "../../../bll/auth/recover/recover-reducer";

const RecoverPage = () => {
        const isFetching = useAppSelector<boolean>(state => state.recover.isFetching)
        const dispatch = useDispatch()

        const [email, setEmail] = useState<string>('')

        const navigate = useNavigate()
        const redirectToLogin = () => navigate(PATH.LOGIN)


        // const sendHandler = () => dispatch(recoverTC(email))
        const sendHandler = () => {
            dispatch(setSentInstruction(true))
        }


        return (
            <div className={s.recoverBlock}>
                <h2 className={s.title}>Forgot password</h2>
                <div className={s.recoverContainer}>
                    <img src={testLogo} className={s.logo} alt={'logo'}/>
                    {isFetching
                        ? <div className={s.form}>
                            <h2>Check email</h2>
                            <p>We've sent an Email with instructions to {email}</p>
                        </div>
                        :
                        <form className={s.form}>
                            <h4>Forgot your password?</h4>
                            <p>Enter your email address and we will send you further instructions </p>
                            <SuperInputText type='email'
                                            value={email}
                                            onChangeText={setEmail}/>
                            <SuperButton disabled={email === ''} onClick={sendHandler}>
                                Send instructions
                            </SuperButton>
                            <p>Did you remember your password?</p>
                            <button className={s.button}
                                    onClick={redirectToLogin}>
                                Try logging in
                            </button>
                        </form>
                    }
                </div>
            </div>
        );
    }
;

export default RecoverPage;
