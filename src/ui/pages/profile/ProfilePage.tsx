import React, {ChangeEvent, useState} from 'react';
import style from './Profile.module.css'
import defaultUserAvatar from '../../../assets/profile/defaultUser.svg'
import {profileAPI} from '../../../api/api';

export const ProfilePage = () => {
    const [newNickname, setNewNickname] = useState('');

    //controlled input
    const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
        setNewNickname(e.currentTarget.value)
    };
    //update nickname by click of button 'save'
    const onSaveClickHandler = () => {
        profileAPI.update({name: newNickname, avatar: 'new avatar'})
            .then((response) => {
                debugger
                console.log(response)
            })
    };

    return (
        <div className={style.profileWrapper}>
            <h2>Personal information</h2>
            <div className={style.avatar}>
                <img src={defaultUserAvatar} alt="Avatar"/>
            </div>
            <div className={style.inputBlock}>
                <div>
                    <input value={newNickname}
                           onChange={onChangeNickname}
                           placeholder={'Nickname'}/>
                </div>
                <div>
                    <input placeholder={'Email'}/>
                </div>
            </div>
            <div className={style.buttonBlock}>
                <button>Cancel</button>
                <button onClick={onSaveClickHandler}>Save</button>
            </div>
        </div>
    );
};
