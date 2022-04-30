import React from 'react';
import style from './Profile.module.css'
import defaultUserAvatar from '../../../assets/profile/defaultUser.svg'

export const ProfilePage = () => {

    return (
        <div className={style.profileWrapper}>
            <h2>Personal information</h2>
            <div className={style.avatar}>
                <img src={defaultUserAvatar} alt="Avatar"/>
            </div>
            <div className={style.inputBlock}>
                <div>
                    <input placeholder={'Nickname'}/>
                </div>
                <div>
                    <input placeholder={'Email'}/>
                </div>
            </div>
            <div className={style.buttonBlock}>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    );
};
