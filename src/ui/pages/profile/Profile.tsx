import React, {ChangeEvent, useState} from 'react';
import style from './Profile.module.scss'
import {Navigate} from 'react-router-dom';
import {PATH} from '../../routes/RoutesApp';
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import paperStyle from '../../common/styles/classes.module.scss';
import defaultAvatar from '../../../assets/images/profile/defaultUser.svg';
import EditableSpan from '../../common/EditableSpan/EditableSpan';
import {updateProfileUserData} from '../../../bll/profile/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import Modal from '../../common/Modal/Modal';

export const Profile = () => {
    const {name, avatar} = useAppSelector(state => state.profile.user);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const isProfileFetching = useAppSelector<boolean>(state => state.profile.isProfileFetching);
    const [newNickname, setNewNickname] = useState(name);
    const [newAvatar, setNewAvatar] = useState('https://icon-library.com/images/icon-avatar/icon-avatar-19.jpg');
    const [howUploadPhoto, setHowUploadPhoto] = useState<'asFile' | 'asURL'>('asURL');
    const [modalActive, setModalActive] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const updateNickName = () => {
        if (newNickname.trim() !== name) {
            dispatch(updateProfileUserData(newNickname))
        }
    };

    // на будущее!!!
    // const onChangeAvatarPhoto = (e:ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length) {
    //         dispatch(updateProfileUserData(e.target.files[0]);
    //     }
    // };

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={style.profileWrapper}>
            <div className={`${style.profileContainer} ${paperStyle.shadowPaper}`} data-z="paper">
                <div className={style.borderAvatar}>
                    <div className={style.avatar}>
                        <img src={avatar ? avatar : defaultAvatar} alt="Avatar"/>
                    </div>
                    <div className={style.changeAvatar}
                         onClick={() => setModalActive(true)}>
                        <FontAwesomeIcon icon={faCamera}/>
                    </div>
                </div>
                <div className={style.name}>
                    {isProfileFetching ? <Preloader size={'20px'} color={'#42A5F5'}/> :
                        <EditableSpan value={newNickname}
                                      onChangeText={setNewNickname}
                                      spanProps={{children: newNickname ? undefined : 'enter nickname...'}}
                                      onBlur={updateNickName}
                                      onEnter={updateNickName}/>}
                </div>
                <span className={style.meDescription}>
                    Front-end developer
            </span>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <input type="file"/>
                <input type="text"/>
            </Modal>
        </div>
    );
};
