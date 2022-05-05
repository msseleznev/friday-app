import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './EditProfilePage.module.css'
import defaultUserAvatar from '../../../../assets/images/profile/defaultUser.svg'
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../../bll/store';
import {setEditMode, updateProfileUserData} from '../../../../bll/profile/profile-reducer';
import {ErrorBar} from '../../../common/ErrorBar/ErrorBar';

export const EditProfilePage = () => {
    const {appError, isAppFetching} = useAppSelector(state => state.app);
    const {avatar, name, email} = useAppSelector(state => state.profile.user);
    const [newNickname, setNewNickname] = useState(name);
    const [newAvatar, setNewAvatar] = useState('https://cdn-icons-png.flaticon.com/512/219/219983.png');
    const dispatch = useDispatch();

    //exit from edit mode after leaving profilePage
    useEffect(() => {
        return () => {
            dispatch(setEditMode(false))
        }
    }, []);

    //controlled input
    const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
        setNewNickname(e.currentTarget.value)
    };
    //update nickname by click of button 'save' and exit from edit mode
    const onSaveClickHandler = () => {
        dispatch(updateProfileUserData(newNickname, newAvatar))
    };
    //exit from edit mode  by click of button 'cancel'
    const onCancelClickHandler = () => {
        dispatch(setEditMode(false))
    };

    return (
        <div className={style.profileWrapper}>
            <h2>Personal information</h2>
            <div className={style.avatar}>
                <img src={avatar ? avatar : defaultUserAvatar} alt="Avatar"/>
            </div>
            <div className={style.inputBlock}>
                <div>
                    <input value={newNickname}
                           onChange={onChangeNickname}
                           placeholder={'Nickname'}/>
                </div>
                <div>
                    <input value={email}
                           placeholder={'Email'}/>
                </div>
            </div>
            <div className={style.buttonBlock}>
                <button disabled={isAppFetching}
                        onClick={onCancelClickHandler}>Cancel
                </button>
                <button disabled={isAppFetching}
                        onClick={onSaveClickHandler}>
                    {isAppFetching ? 'Loading...' : 'Save'}
                </button>
            </div>
            {appError && <ErrorBar error={appError}/>}
        </div>
    );
};
