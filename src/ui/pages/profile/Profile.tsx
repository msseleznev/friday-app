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
    const [newAvatarURL, setNewAvatarURL] = useState('');
    const [newAvatar64, setNewAvatar64] = useState('');
    const uploadMethods = [UPLOAD_METHODS.AS_FILE, UPLOAD_METHODS.AS_URL];
    const [howUploadPhoto, setHowUploadPhoto] = useState<UPLOAD_METHODS>(uploadMethods[0]);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const [modalActive, setModalActive] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const updateNickName = () => {
        if (newNickname.trim() !== name) {
            dispatch(updateProfileUserData(newNickname))
        }
    };
    const updateAvatar = () => {
        if (howUploadPhoto === UPLOAD_METHODS.AS_URL) {
            if (newAvatarURL && newAvatarURL.trim() !== avatar) {
                dispatch(updateProfileUserData(name, newAvatarURL))
            }
        } else {
            dispatch(updateProfileUserData(name, newAvatar64))
        }
        setModalActive(false);
        setNewAvatarURL('');
        setNewAvatar64('');
    };

    const onChangeAvatarPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const reader = new FileReader();

        const avatarFile = e.target.files && e.target.files[0];

        if (avatarFile) {
            formData.append('avatarFile', avatarFile, avatarFile.name);

            if (howUploadPhoto === UPLOAD_METHODS.AS_FILE) {
                reader.onloadend = () => {
                    reader.result && setNewAvatar64(reader.result as string);
                };
                reader.readAsDataURL(avatarFile)
            } else {
                reader.readAsText(avatarFile);
                setNewAvatarURL(window.URL.createObjectURL(avatarFile))
            }
        }
    };
    const whatIsPreviewImg = howUploadPhoto === UPLOAD_METHODS.AS_FILE ? newAvatar64 : newAvatarURL;
    const isPreviewShow = howUploadPhoto === UPLOAD_METHODS.AS_FILE && newAvatar64 ||
        UPLOAD_METHODS.AS_URL && newAvatarURL;

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
                    <div className={style.uploadPhotoButton}>
                        <input ref={inputFileRef}
                               type="file"
                               onChange={onChangeAvatarPhoto}/>
                        <ButtonSecondary className={style.downloadButton}
                                         onClick={() => inputFileRef.current && inputFileRef.current.click()}>
                            <span>Select a file</span>
                            <FontAwesomeIcon icon={faDownload}/>
                        </ButtonSecondary>
                        {isPreviewShow && <div className={style.avatarPreview}>
                            <p>Preview</p>
                            <div className={style.avatarPreviewImg}>
                                <img src={whatIsPreviewImg} alt="Avatar preview"/>
                            </div>
                        </div>}
                    </div>
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
