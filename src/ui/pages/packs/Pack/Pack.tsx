import React, {ChangeEvent, MouseEvent, useEffect, useRef, useState} from 'react';
import {CardPackType} from '../../../../api/api';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {deletePackTC, editPackTC, sortPacks} from '../../../../bll/packs/packs-reducer';
import style from './Pack.module.scss'
import {ButtonSecondary} from '../../../common/ButtonSecondary/ButtonSecondary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons/faBookOpen';
import {InputText} from '../../../common/InputText/InputText';
import {Button} from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import {cardsActions} from '../../../../bll/cards/cards-reducer';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';


type PackPropsType = {
    data: CardPackType
}
export const Pack: React.FC<PackPropsType> = ({data}) => {

    const userId = useAppSelector(state => state.profile.user._id);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalMod, setModalMod] = useState<"delete" | "edit">('delete')
    const dispatch = useAppDispatch();
    const [newPackName, setNewPackName] = useState(data.name);
    useEffect(() => {
        setFile64('');
    }, [])

    const modalModHandler = (e: MouseEvent<HTMLButtonElement>, mod: "delete" | "edit") => {
        e.stopPropagation()
        if (mod !== "delete") {
            setModalMod(mod)
            setModalActive(true);
        } else {
            setModalMod(mod)
            setModalActive(true);
        }
    };

    const deletePack = () => {
        dispatch(deletePackTC(data._id));
        setModalActive(false);
    };

    const editPack = () => {
        dispatch(editPackTC({_id: data._id, name: newPackName, deckCover: file64}));
        setModalActive(false);
        setFile64('');
    };


    //redirect to cards
    const navigate = useNavigate();
    const openPack = () => {
        dispatch(cardsActions.setPackId(''))
        navigate(`/cards/${data._id}/${data.name}`);
    };

    //redirect to learn
    const openLearn = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(sortPacks(''))
        dispatch(cardsActions.setPackId(''));
        navigate(`/learn/${data._id}/${data.name}`);
    };

    //server data conversion
    const updated = data.updated.slice(0, 10).split('-').reverse().join('.');
    const userName = data.user_name.split('@')[0];
    const isMyPack = data.user_id === userId;

    //for changing pack image
    const inRef = useRef<HTMLInputElement>(null);
    const [file64, setFile64] = useState('');
    const onChangePackImage = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const packImage = e.target.files && e.target.files[0];
        if (packImage) {
            reader.onloadend = () => {
                setFile64(reader.result as string);
            }
            reader.readAsDataURL(packImage);
        }
    };
    return (
        <>
            <tr className={style.packRow}
                onClick={openPack}>
                <td className={style.nameCol}>
                    <span className={data.deckCover ? style.withImage : ''}>{data.name}</span>
                    {data.deckCover &&
                    <div>
                        <img src={data.deckCover}/>
                    </div>
                    }
                </td>
                <td className={style.cardsCountCol}>{data.cardsCount}</td>
                <td className={style.updatedCol}>{updated}</td>
                <td className={style.userNameCol}>{userName}</td>
                <td className={style.actions}>
                    <span className={style.actionsRow}>
                        <span className={style.actionsCol}>
                            {data.cardsCount > 0 && <ButtonSecondary className={style.learnButton}
                                                                     onClick={openLearn}>
                                <FontAwesomeIcon icon={faBookOpen}/>&ensp; Learn
                            </ButtonSecondary>}
                        </span>
                        <span className={style.actionsCol}>
                            {isMyPack && <ButtonSecondary className={style.editButton}
                                                          onClick={(e) => modalModHandler(e, "edit")}>
                                <FontAwesomeIcon icon={faPencil}/>&ensp; Edit
                            </ButtonSecondary>}
                        </span>
                        <span className={style.actionsCol}>
                            {isMyPack && <ButtonSecondary className={style.deleteButton}
                                                          onClick={(e) => modalModHandler(e, "delete")}>
                                <FontAwesomeIcon icon={faXmark}/>&ensp; Delete
                            </ButtonSecondary>}
                        </span>
                    </span>
                </td>
            </tr>
            <Modal active={modalActive}
                   setActive={setModalActive}>
                {modalMod === 'delete'
                    ? <>
                        <h3>Delete pack "<span style={{color: '#42A5F5'}}>{data.name}</span>" ?</h3>
                        <div style={{display: "flex"}}>
                            <Button style={{margin: 10}} red onClick={deletePack}>Yes</Button>
                            <Button style={{margin: 10}} green onClick={() => {
                                setModalActive(false)
                            }}>No</Button>
                        </div>
                    </>
                    : <>
                        <h3 style={{margin: 10, color: '#42A5F5'}}>Edit name</h3>
                        <InputText style={{width: '300px'}}
                                   value={newPackName}
                                   onChangeText={setNewPackName}/>
                        <input ref={inRef}
                               type="file"
                               onChange={onChangePackImage}
                        />
                        <ButtonSecondary className={style.downloadButton}
                                         onClick={() => inRef.current && inRef.current.click()}>
                            <span>upload image</span>
                            <FontAwesomeIcon icon={faDownload}/>
                        </ButtonSecondary>
                        {file64 && <div className={style.imagePreview}>
                            <p>
                                <span>Preview</span>
                                <FontAwesomeIcon icon={faXmark}
                                                 onClick={() => setFile64('')}
                                                 className={style.closeIcon}/>
                            </p>
                            <div className={style.imagePreviewImg}>
                                <img src={file64} alt="New pack preview"/>
                            </div>
                        </div>}
                        <Button style={{marginTop: 20}} onClick={editPack}>Edit</Button>
                    </>}
            </Modal>
        </>
    );
};

export default Pack;