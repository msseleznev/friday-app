import {CardType} from '../../../../api/cardsApi';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {deleteCardTC, updateCardTC} from '../../../../bll/cards/cards-reducer';
import style from './Card.module.scss';
import {ButtonSecondary} from '../../../common/ButtonSecondary/ButtonSecondary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {Button} from '../../../common/Button/Button';
import {InputText} from '../../../common/InputText/InputText';
import Modal from '../../../common/Modal/Modal';
import {Textarea} from '../../../common/Textarea/Textarea';
import {setGradeColor} from '../../../../utils/setGradeColor';

type CardPropsType = {
    card: CardType
    cardsPack_id: string
    userPackId: string
}
export const Card = React.memo(({
                                        card,
                                        cardsPack_id,
                                        userPackId,
                                        ...props
                                    }: CardPropsType) => {

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalMod, setModalMod] = useState<"delete" | "edit">('delete')
    const [newQuestion, setNewQuestion] = useState(card.question);
    const [newAnswer, setNewAnswer] = useState(card.answer);

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

    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.profile.user._id);
    const updated = card.updated.slice(0, 10).split('-').reverse().join('.');
    const isMyPack = userId === userPackId;

    const deleteCardHandler = () => {
        dispatch(deleteCardTC(card._id));
    };
    const getEditedPack = () => {
        dispatch(updateCardTC(card._id, newQuestion, newAnswer));
        setModalActive(false);
    };
    const gradeColor = setGradeColor(card.grade);

    return (
        <>
            <tr className={style.cardRow}>
                <td className={style.questionsCol}>{card.question}</td>
                <td className={style.answerCol}>{card.answer}</td>
                <td className={style.updatedCol}>{updated}</td>
                <td className={style.gradeCol}
                    style={{color:gradeColor, fontSize:'20px'}}>{card.grade.toFixed(1)}</td>
                {isMyPack &&
                <td className={style.actions}>
                    <span className={style.actionsRow}>
                        <span className={style.actionsCol}>
                            <ButtonSecondary className={style.editButton}
                                             onClick={(e) => modalModHandler(e, "edit")}>
                                <FontAwesomeIcon icon={faPencil}/>&ensp; Edit
                            </ButtonSecondary>
                        </span>
                        <span className={style.actionsCol}>
                            <ButtonSecondary className={style.deleteButton}
                                             onClick={(e) => modalModHandler(e, "delete")}>
                                <FontAwesomeIcon icon={faXmark}/>&ensp; Delete
                            </ButtonSecondary>
                        </span>
                    </span>
                </td>}
            </tr>
            <Modal active={modalActive} setActive={setModalActive}>
                {modalMod === 'delete'
                    ? <>
                        <h3>Delete pack this card?</h3>
                        <div style={{display: "flex"}}>
                            <Button style={{margin: 10}} red onClick={deleteCardHandler}>Yes</Button>
                            <Button style={{margin: 10}} green onClick={() => {
                                setModalActive(false)
                            }}>No</Button>
                        </div>
                    </>
                    : <>
                        <h3 style={{margin: 10}}>Question</h3>
                        <InputText value={newQuestion}
                                   onChangeText={setNewQuestion}
                                   style={{width: '300px'}}/>
                        <h3>Answer</h3>
                        <Textarea value={newAnswer}
                                  onChangeText={setNewAnswer}
                                  style={{minHeight: '150px', resize: 'vertical'}}/>
                        <Button style={{marginTop: 20}} onClick={getEditedPack}>Save</Button>
                    </>}
            </Modal>
        </>
    );
});

