import React, {ChangeEvent, useState} from 'react';
import style from './EditProfilePage.module.css'
import defaultUserAvatar from '../../../assets/images/profile/defaultUser.svg'
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../bll/store';
import {updateProfileUserData} from '../../../bll/profile/profile-reducer';

export const EditProfilePage = () => {
    const [newNickname, setNewNickname] = useState('');
    const [newAvatar, setNewAvatar] = useState('sdasdf');
    const dispatch = useDispatch();
    const isFetching = useAppSelector<boolean>(state => state.profile.isFetching);

    //controlled input
    const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
        setNewNickname(e.currentTarget.value)
    };
    //update nickname by click of button 'save'
    const onSaveClickHandler = () => {
        dispatch(updateProfileUserData(newNickname, newAvatar))
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
                <button disabled={isFetching}>Cancel</button>
                <button disabled={isFetching}
                        onClick={onSaveClickHandler}>
                    {isFetching ? 'Loading...' : 'Save'}
                </button>
            </div>
        </div>
    );
};
