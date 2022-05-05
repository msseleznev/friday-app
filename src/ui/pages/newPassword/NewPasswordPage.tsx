import React from 'react';
import s from "./NewPassword.module.css";
import testLogo from "../../../assets/images/TestLogo.png";
import {SuperInputText} from "../../common/superInputText/SuperInputText";
import {SuperButton} from "../../common/superButton/SuperButton";

const NewPasswordPage = () => {
    return (
        <div className={s.newPasswordBlock}>
            <h2 className={s.title}>Create new password</h2>
            <div className={s.newPasswordContainer}>
                <img src={testLogo} className={s.logo} alt={'logo'}/>
                    <form className={s.form}>
                        <p>Enter new password</p>
                        <SuperInputText type='email'/>
                        <SuperButton>
                            Save new password
                        </SuperButton>
                    </form>
            </div>
        </div>
    );
};

export default NewPasswordPage;