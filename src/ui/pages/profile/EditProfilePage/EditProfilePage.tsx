import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './EditProfilePage.module.css'
import defaultUserAvatar from '../../../../assets/images/profile/defaultUser.svg'
import {setEditMode, updateProfileUserData} from '../../../../bll/profile/profile-reducer';
import {useAppDispatch, useAppSelector} from "../../../../bll/hooks";

export const EditProfilePage = () => {
    const isAppFetching = useAppSelector<boolean>(state => state.app.isAppFetching);
    const {avatar, name, email} = useAppSelector(state => state.profile.user);
    const [newNickname, setNewNickname] = useState(name);
    const [newAvatar, setNewAvatar] = useState('https://www.svgrepo.com/show/292188/user-avatar.svg');
    const dispatch = useAppDispatch();

    //exit from edit mode after leaving profilePage
    useEffect(() => {
        dispatch(setEditMode(true))
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
        dispatch(updateProfileUserData(newNickname))
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
                           placeholder={'Nickname'}
                           disabled={isAppFetching}/>
                </div>
                <div>
                    <input value={email}
                           readOnly
                           placeholder={'Email'}
                           disabled={isAppFetching}/>
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
        </div>
    );
};
