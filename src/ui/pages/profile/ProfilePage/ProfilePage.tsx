import React from 'react';
import style from './ProfilePage.module.css'
import defaultUserAvatar from '../../../../assets/images/profile/defaultUser.svg'
import {setEditMode} from '../../../../bll/profile/profile-reducer';
import {EditProfilePage} from '../EditProfilePage/EditProfilePage';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../routes/RoutesApp';
import {ErrorBar} from '../../../common/ErrorBar/ErrorBar';
import {logoutTC} from "../../../../bll/auth/login/login-reducer";
import {useAppDispatch, useAppSelector} from "../../../../bll/hooks";

export const ProfilePage = () => {
    const {name, avatar} = useAppSelector(state => state.profile.user);
    const editMode = useAppSelector(state => state.profile.editMode);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const {appError, isAppFetching} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch()
    const onClickEditProfileHandler = () => {
        dispatch(setEditMode(true))
    };
    const onLogoutClickHandler = () => dispatch(logoutTC());

    if (editMode) {
        return <EditProfilePage/>
    }
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={style.profileWrapper}>
            <div className={style.settingsBlock}>
                <div className={style.avatar}>
                    <img src={avatar ? avatar : defaultUserAvatar} alt="Avatar"/>
                </div>
                <div className={style.profileDescription}>
                    <div className={style.nickName}>
                        <h3>{name ? name : 'nickName'}</h3>
                        <p>Front-end developer</p>
                        <button onClick={onClickEditProfileHandler}>Edit profile</button>
                    </div>
                    <div className={style.numbersOfCards}>
                        <p>Numbers of cards</p>
                        <input type="range"/>
                    </div>
                    <div>

                        {/*Test logout button*/}
                        <button onClick={onLogoutClickHandler}
                                disabled={isAppFetching}>
                            Log out
                        </button>
                        {/*Test logout button*/}

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
            {appError && <ErrorBar error={appError}/>}
        </div>
    );
};
