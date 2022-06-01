import {CardType} from '../../../../api/cardsApi';
import React, {MouseEvent, useCallback, useRef, useState} from 'react';
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
import {StarSVGSolid} from '../../../common/Rating/Rating';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {onChangeAttachAnswerImageCreator} from '../../../../assets/utils';

type CardPropsType = {
    card: CardType
    cardsPack_id: string
    userPackId: string
    // onChangeAttachAnswerImage: (e: ChangeEvent<HTMLInputElement>) => void
    answerImg64: string
}
export const Card = React.memo(({
                                    card,
                                    cardsPack_id,
                                    userPackId,
                                    // onChangeAttachAnswerImage,
                                    answerImg64,
                                    ...props
                                }: CardPropsType) => {

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [modalMod, setModalMod] = useState<'delete' | 'edit'>('delete');
    const [newQuestion, setNewQuestion] = useState(card.question);
    const [newAnswer, setNewAnswer] = useState(card.answer);
    const [answerImg64Cards, setAnswerImg64Cards] = useState<string>('');

    const inputFileRef = useRef<HTMLInputElement>(null);

    const modalModHandler = useCallback((e: MouseEvent<HTMLButtonElement>, mod: 'delete' | 'edit') => {
        e.stopPropagation();
        if (mod !== 'delete') {
            setModalMod(mod);
            setModalActive(true);
        } else {
            setModalMod(mod);
            setModalActive(true);
        }
    }, []);

    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.profile.user._id);
    const updated = card.updated.slice(0, 10).split('-').reverse().join('.');
    const isMyPack = userId === userPackId;

    const deleteCardHandler = useCallback(() => {
        dispatch(deleteCardTC(card._id));
    }, [card._id, dispatch]);

    const getEditedPack = useCallback(() => {
        dispatch(updateCardTC(card._id, newQuestion, newAnswer, answerImg64Cards));
        setModalActive(false);
        setAnswerImg64Cards('')
    }, [card._id, newQuestion, newAnswer, dispatch, answerImg64Cards, card.answerImg]);
    const gradeColor = setGradeColor(card.grade);

    const onChangeAttachAnswerImage = useCallback((target: HTMLInputElement) => onChangeAttachAnswerImageCreator(setAnswerImg64Cards, target), [])


    return (
        <>
            <tr className={style.cardRow}>
                <td className={style.questionsCol}>{card.question}</td>
                <td className={style.answerCol}>
                    <span className={card.answerImg ? style.withImage : ''}>{card.answer}</span>
                    {card.answerImg &&
                    <div>
                        <img src={card.answerImg}/>
                    </div>
                    }
                </td>
                <td className={style.updatedCol}>{updated}</td>
                <td className={style.gradeCol}
                    style={{color: gradeColor, fontSize: '20px'}}>
                    <span className={style.star}><StarSVGSolid/></span>{card.grade.toFixed(1)}
                </td>
                {isMyPack &&
                <td className={style.actions}>
                    <span className={style.actionsRow}>
                        <span className={style.actionsCol}>
                            <ButtonSecondary className={style.editButton}
                                             onClick={(e) => modalModHandler(e, 'edit')}>
                                <FontAwesomeIcon icon={faPencil}/>&ensp; Edit
                            </ButtonSecondary>
                        </span>
                        <span className={style.actionsCol}>
                            <ButtonSecondary className={style.deleteButton}
                                             onClick={(e) => modalModHandler(e, 'delete')}>
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
                        <div style={{display: 'flex'}}>
                            <Button style={{margin: 10}} red onClick={deleteCardHandler}>Yes</Button>
                            <Button style={{margin: 10}} green onClick={() => {
                                setModalActive(false);
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
                        <input ref={inputFileRef}
                               type='file'
                               accept='.image/jpeg, .png, .jpg'
                               onChange={(e) => onChangeAttachAnswerImage(e.target)}
                               style={{display: 'none'}}/>
                        <ButtonSecondary className={style.downloadButton}
                                         onClick={() => inputFileRef.current && inputFileRef.current.click()}>
                            <span>Attach Image </span>
                            <FontAwesomeIcon icon={faDownload}/>
                        </ButtonSecondary>
                        {answerImg64Cards.length > 0 &&
                        <div>
                            <img src={answerImg64Cards} alt='answerImg64 preview' width={'200px'}/>
                        </div>
                        }
                        <Button style={{marginTop: 20}} onClick={getEditedPack}>Save</Button>
                    </>}
            </Modal>
        </>
    );
});

