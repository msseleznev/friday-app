import React, {useState} from 'react';
import {CardPackType} from '../../../../api/api';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {deletePackTC, editPackTC} from '../../../../bll/packs/packs-reducer';
import style from './TestPack.module.scss'
import {ButtonSecondary} from '../../../common/ButtonSecondary/ButtonSecondary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {faBook} from '@fortawesome/free-solid-svg-icons/faBook';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons/faBookOpen';


type PackPropsType = {
    data: CardPackType
}
const TestPack: React.FC<PackPropsType> = ({data}) => {

    const userId = useAppSelector(state => state.profile.user._id);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [newPackName, setNewPackName] = useState(data.name);

    const deletePackHandler = () => {
        dispatch(deletePackTC(data._id));
    };
    const editPackHandler = () => {
        setModalActive(true);
    };

    const getNewPackName = () => {
        dispatch(editPackTC({_id: data._id, name: newPackName}));
        setModalActive(false);
    };


    //redirect to cards
    const navigate = useNavigate();
    const openPack = () => {
        navigate(`/cards/${data._id}`);
    };

    //server data conversion
    const updated = data.updated.slice(0, 10).split('-').reverse().join('.');
    const userName = data.user_name.split('@')[0];


    return (
        <tr className={style.packRow}>
            <td className={style.nameCol}>{data.name}</td>
            <td className={style.cardsCountCol}>{data.cardsCount}</td>
            <td className={style.updatedCol}>{updated}</td>
            <td className={style.userNameCol}>{userName}</td>
            <td className={style.actions}>
                <div  className={style.actionsRow}>
                    <div  className={style.actionsCol}>
                        <ButtonSecondary className={style.learnButton}>
                            <FontAwesomeIcon icon={faBookOpen}/>
                        </ButtonSecondary>
                    </div>
                    <div  className={style.actionsCol}>
                        <ButtonSecondary className={style.editButton}>
                            <FontAwesomeIcon icon={faPencil}/>
                        </ButtonSecondary>
                    </div>
                    <div  className={style.actionsCol}>
                        <ButtonSecondary className={style.deleteButton}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </ButtonSecondary>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default TestPack;