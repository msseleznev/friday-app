import React, {useState} from 'react';
import {CardPackType} from '../../../../api/api';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {deletePackTC, editPackTC, sortPacks} from '../../../../bll/packs/packs-reducer';
import style from './TestPack.module.scss'
import {ButtonSecondary} from '../../../common/ButtonSecondary/ButtonSecondary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons/faBookOpen';
import {InputText} from '../../../common/InputText/InputText';
import {Button} from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import {cardsActions} from '../../../../bll/cards/cards-reducer';


type PackPropsType = {
    data: CardPackType
}
const TestPack: React.FC<PackPropsType> = ({data}) => {

    const userId = useAppSelector(state => state.profile.user._id);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalMod, setModalMod] = useState<"delete" | "edit">('delete')
    const dispatch = useAppDispatch();
    const [newPackName, setNewPackName] = useState(data.name);

    const modalModHandler = (e: any, mod: "delete" | "edit") => {
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

    const getNewPackName = () => {
        dispatch(editPackTC({_id: data._id, name: newPackName}));
        setModalActive(false);
    };


    //redirect to cards
    const navigate = useNavigate();
    const openPack = (e: any) => {
        dispatch(cardsActions.setPackId(''))
        dispatch(cardsActions.setPackName(data.name))
        navigate(`/cards/${data._id}`);
    };

    //redirect to learn
    const openLearn = (e: any) => {
        e.stopPropagation();
        dispatch(sortPacks(''))
        dispatch(cardsActions.setPackId(''));
        navigate(`/learn/${data._id}`);
    };

    //server data conversion
    const updated = data.updated.slice(0, 10).split('-').reverse().join('.');
    const userName = data.user_name.split('@')[0];
    const isMyPack = data.user_id === userId;


    return (
        <>
            <tr className={style.packRow}
                onClick={openPack}>
                <td className={style.nameCol}
                >{data.name}</td>
                <td className={style.cardsCountCol}>{data.cardsCount}</td>
                <td className={style.updatedCol}>{updated}</td>
                <td className={style.userNameCol}>{userName}</td>
                <td className={style.actions}>
                    <div className={style.actionsRow}>
                        <div className={style.actionsCol}>
                            {data.cardsCount > 0 && <ButtonSecondary className={style.learnButton}
                                                                     onClick={openLearn}>
                                <FontAwesomeIcon icon={faBookOpen}/>&ensp; Learn
                            </ButtonSecondary>}
                        </div>
                        <div className={style.actionsCol}>
                            {isMyPack && <ButtonSecondary className={style.editButton}
                                                          onClick={(e) => modalModHandler(e, "edit")}>
                                <FontAwesomeIcon icon={faPencil}/>&ensp; Edit
                            </ButtonSecondary>}
                        </div>
                        <div className={style.actionsCol}>
                            {isMyPack && <ButtonSecondary className={style.deleteButton}
                                                          onClick={(e) => modalModHandler(e, "delete")}>
                                <FontAwesomeIcon icon={faXmark}/>&ensp; Delete
                            </ButtonSecondary>}
                        </div>
                    </div>
                </td>
            </tr>
            <Modal active={modalActive} setActive={setModalActive}>
                {modalMod === 'delete'
                    ? <>
                        <p>Delete pack "{data.name}" ?</p>
                        <div style={{display: "flex"}}>
                            <Button style={{margin: 10}} red onClick={deletePack}>Yes</Button>
                            <Button style={{margin: 10}} green onClick={() => {
                                setModalActive(false)
                            }}>No</Button>
                        </div>
                    </>
                    : <>
                        <h3 style={{margin: 10}}>Edit name</h3>
                        <InputText value={newPackName} onChangeText={setNewPackName}/>
                        <Button style={{marginTop: 20}} onClick={getNewPackName}>Edit</Button>
                    </>}
            </Modal>
        </>
    );
};

export default TestPack;