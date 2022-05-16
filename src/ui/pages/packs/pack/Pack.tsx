import React, {useState} from 'react';
import s from './Pack.module.css';
import {CardPackType} from '../../../../api/api';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {deletePackTC, editPackTC} from '../../../../bll/packs/packs-reducer';
import {Button} from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import {InputText} from '../../../common/InputText/InputText';
import {cardsActions} from '../../../../bll/cards/cards-reducer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons/faGraduationCap';


type PackPropsType = {
    data: CardPackType
}
export const Pack: React.FC<PackPropsType> = ({data}) => {

    const userId = useAppSelector(state => state.profile.user._id);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalMod, setModalMod] = useState<"delete" | "edit">('delete')
    const dispatch = useAppDispatch();
    const [newPackName, setNewPackName] = useState(data.name);

    const modalModHandler = (mod: "delete" | "edit") => {
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
    const openPack = () => {
        dispatch(cardsActions.setPackId(''))
        navigate(`/cards/${data._id}`);
    };

    //server data conversion
    const updated = data.updated.slice(0, 10).split('-').reverse().join('.');
    const userName = data.user_name.split('@')[0];


    return (
        <div className={s.tableContent}>
            <div className={s.name} onClick={openPack}>{data.name}</div>
            <div className={s.cards}>{data.cardsCount}</div>
            <div className={s.when}>{updated}</div>
            <div className={s.when}>{userName}</div>
            <div className={s.actions}>
                <div className={s.actionsBlock}>
                    {data.user_id === userId
                        && <FontAwesomeIcon style={{padding: 10, color: "#f59090", cursor: "pointer"}}
                                            icon={faTrashCan}
                                            size={"lg"}
                                            onClick={() => {
                                                modalModHandler("delete")
                                            }}/>}
                    {data.user_id === userId
                        && <FontAwesomeIcon style={{padding: 10, color: "#42a5f5", cursor: "pointer"}}
                                            icon={faPenToSquare}
                                            size={"lg"}
                                            onClick={() => modalModHandler("edit")}/>}
                    <FontAwesomeIcon style={{padding: 10, color: "#7cc988", cursor: "pointer"}}
                                     icon={faGraduationCap}
                                     size={"lg"}/>
                </div>

            </div>
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
        </div>
    );
};
