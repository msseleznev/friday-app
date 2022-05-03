import React from 'react';
import style from './ProfilePage.module.css'
import defaultUserAvatar from '../../../../assets/images/profile/defaultUser.svg'
import {useAppSelector} from '../../../../bll/store';
import {useDispatch} from 'react-redux';
import {setEditMode} from '../../../../bll/profile/profile-reducer';
import {EditProfilePage} from '../EditProfilePage/EditProfilePage';

export const ProfilePage = () => {
    const nickName = useAppSelector<string>(state => state.profile.user.name);
    const avatar = useAppSelector<string | undefined>(state => state.profile.user.avatar);
    const editMode = useAppSelector<boolean>(state => state.profile.editMode);
    const dispatch = useDispatch()
    const onClickEditProfileHandler = () => {
        dispatch(setEditMode(true))
    };
    if (editMode) {
        return <EditProfilePage/>
    }
    return (
        <div className={style.profileWrapper}>
            <div className={style.settingsBlock}>
                <div className={style.avatar}>
                    <img src={avatar ? avatar : defaultUserAvatar} alt="Avatar"/>
                </div>
                <div className={style.profileDescription}>
                    <div className={style.nickName}>
                        <h3>{nickName ? nickName : 'nickName'}</h3>
                        <p>Front-end developer</p>
                        <button onClick={onClickEditProfileHandler}>Edit profile</button>
                    </div>
                    <div className={style.numbersOfCards}>
                        <p>Numbers of cards</p>
                        <input type="range"/>
                    </div>
                </div>
            </div>
            <div className={style.packsList}>
                <h2>My packs list</h2>
                <div className={style.searchInput}>
                    <input placeholder={'Search'}/>
                </div>
                <div className={style.table}>
                    Table
                </div>
                <div className={style.pagination}>
                    Pagination
                </div>
            </div>
        </div>
    );
};
