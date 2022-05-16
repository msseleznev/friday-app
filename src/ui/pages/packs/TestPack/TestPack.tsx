import React, {useState} from 'react';
import {CardPackType} from '../../../../api/api';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {deletePackTC, editPackTC} from '../../../../bll/packs/packs-reducer';
import style from './TestPack.module.scss'
import {ButtonSecondary} from '../../../common/ButtonSecondary/ButtonSecondary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons/faBookOpen';
import {InputText} from '../../../common/InputText/InputText';
import {Button} from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';


type PackPropsType = {
    data: CardPackType
}
const TestPack: React.FC<PackPropsType> = ({data}) => {

    const userId = useAppSelector(state => state.profile.user._id);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [newPackName, setNewPackName] = useState(data.name);

    const deletePackHandler = (e: any) => {
        e.stopPropagation()
        dispatch(deletePackTC(data._id));
    };
    const editPackHandler = (e: any) => {
        e.stopPropagation()
        setModalActive(true);
    };

    const getNewPackName = () => {
        dispatch(editPackTC({_id: data._id, name: newPackName}));
        setModalActive(false);
    };


    //redirect to cards
    const navigate = useNavigate();
    const openPack = (e: any) => {
        navigate(`/cards/${data._id}`);
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
                    <div className={style.actionsRow}
                    >
                        <div className={style.actionsCol}>
                            <ButtonSecondary className={style.learnButton}>
                                <FontAwesomeIcon icon={faBookOpen}/>&ensp; Learn
                            </ButtonSecondary>
                        </div>
                        {isMyPack &&
                        <>
                            <div className={style.actionsCol}>
                                <ButtonSecondary className={style.editButton}
                                                 onClick={editPackHandler}>
                                    <FontAwesomeIcon icon={faPencil}/>&ensp; Edit
                                </ButtonSecondary>
                            </div>
                            <div className={style.actionsCol}>
                                <ButtonSecondary className={style.deleteButton}
                                                 onClick={deletePackHandler}>
                                    <FontAwesomeIcon icon={faXmark}/>&ensp; Delete
                                </ButtonSecondary>
                            </div>
                        </>
                        }
                    </div>
                </td>
            </tr>
            <Modal active={modalActive} setActive={setModalActive}>
                <h3 style={{margin: 10}}>Edit name</h3>
                <InputText value={newPackName} onChangeText={setNewPackName}/>
                <Button style={{marginTop: 20}} onClick={getNewPackName}>Edit</Button>
            </Modal>
        </>
    );
};

export default TestPack;