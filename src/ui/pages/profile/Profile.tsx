import React, {ChangeEvent, useRef, useState} from 'react';
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
import {Radio} from '../../common/Radio/Radio';
import {Button} from '../../common/Button/Button';
import {InputText} from '../../common/InputText/InputText';
import {ButtonSecondary} from '../../common/ButtonSecondary/ButtonSecondary';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';

enum UPLOAD_METHODS {
    AS_URL = 'As URL',
    AS_FILE = 'As file'
}

export const Profile = () => {
    const {name, avatar} = useAppSelector(state => state.profile.user);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const isProfileFetching = useAppSelector<boolean>(state => state.profile.isProfileFetching);
    const [newNickname, setNewNickname] = useState(name);
    const [newAvatar, setNewAvatar] = useState(avatar);
    const uploadMethods = [UPLOAD_METHODS.AS_URL, UPLOAD_METHODS.AS_FILE];
    const [howUploadPhoto, setHowUploadPhoto] = useState<UPLOAD_METHODS>(uploadMethods[0]);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const onChangeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAvatar(e.currentTarget.value)
    }
    const [modalActive, setModalActive] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const updateNickName = () => {
        if (newNickname.trim() !== name) {
            dispatch(updateProfileUserData(newNickname))
        }
    };
    const updateAvatar = () => {
        if (howUploadPhoto === UPLOAD_METHODS.AS_URL) {
            if (newAvatar && newAvatar.trim() !== avatar) {
                dispatch(updateProfileUserData(name, newAvatar))
            }
        } else {

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
                <div className={style.changeAvatarSettings}>
                    <div className={style.radioButtons}>
                        <Radio
                            name={'radio'}
                            options={uploadMethods}
                            value={howUploadPhoto}
                            onChangeOption={setHowUploadPhoto}
                        />
                    </div>
                    {howUploadPhoto === uploadMethods[0] ?
                        <InputText value={newAvatar}
                                   onChange={onChangeAvatarHandler}/> :
                        <div className={style.uploadPhotoButton}>
                            <input ref={inputFileRef} type="file"/>
                            <ButtonSecondary className={style.downloadButton}
                            onClick={()=> inputFileRef.current && inputFileRef.current.click()}>
                                <span>Select a file</span>
                                <FontAwesomeIcon icon={faDownload}/>
                            </ButtonSecondary>
                        </div>}
                </div>
                <div className={style.uploadButton}>
                    {isProfileFetching ?
                        <Preloader size={'20px'} color={'#42A5F5'}/> :
                        <Button onClick={updateAvatar}>
                            Upload photo
                        </Button>}
                </div>
            </Modal>
        </div>
    );
};
