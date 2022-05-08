import React, {useState} from 'react';
import s from "./NewPassword.module.css";
import testLogo from "../../../assets/images/TestLogo.png";
import {SuperInputText} from "../../common/superInputText/SuperInputText";
import {SuperButton} from "../../common/superButton/SuperButton";
import {useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../routes/RoutesApp";
import {saveNewPasswordTC} from "../../../bll/auth/newPassword/new-password-reducer";
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';


const NewPasswordPage = () => {

    const isFetching = useAppSelector(state => state.newPassword.isFetching)
    const dispatch = useAppDispatch()

    const [password, setPassword] = useState<string>('')
    const [repPassword, setRepPassword] = useState<string>('')
    const params = useParams<'*'>()
    const resetPasswordToken = params["*"]
    const saveHandler = () => {
        if (resetPasswordToken) {
            dispatch(saveNewPasswordTC({password, resetPasswordToken}))
        }
    }

    const navigate = useNavigate()
    const redirectToLogin = () => navigate(PATH.LOGIN)


    return (
        <div className={s.newPasswordBlock}>
            <h2 className={s.title}>Create new password</h2>
            <div className={s.newPasswordContainer}>
                <img src={testLogo} className={s.logo} alt={'logo'}/>
                {isFetching
                    ? <div className={s.form}>
                        <h3>The new password has been successfully saved.</h3>
                        <button className={s.button}
                                onClick={redirectToLogin}>
                            Login with new password
                        </button>
                    </div>
                    : <form className={s.form}>
                        <p>Enter new password</p>
                        <SuperInputText type='password'
                                        value={password}
                                        onChangeText={setPassword}/>
                        <p>Repeat new password</p>
                        <SuperInputText type='password'
                                        value={repPassword}
                                        onChangeText={setRepPassword}/>
                        <SuperButton disabled={password !== repPassword || password === ''}
                                     onClick={saveHandler}>
                            Save new password
                        </SuperButton>
                    </form>}

            </div>
        </div>
    );
};

export default NewPasswordPage;