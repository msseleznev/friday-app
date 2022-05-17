import {CardType} from '../../../../api/cardsApi';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {deleteCardTC, updateCardTC} from '../../../../bll/cards/cards-reducer';
import style from './TestCard.module.scss';

type CardPropsType = {
    card: CardType
    cardsPack_id: string
    userPackId: string
}
export const TestCard = React.memo(({
                                        card,
                                        cardsPack_id,
                                        userPackId,
                                        ...props
                                    }: CardPropsType) => {

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [newQuestion, setNewQuestion] = useState(card.question);
    const [newAnswer, setNewAnswer] = useState(card.answer);

    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.profile.user._id);
    const updated = card.updated.slice(0, 10).split('-').reverse().join('.');
    const isMyPack = userId === userPackId;

    const deleteCardHandler = () => {
        dispatch(deleteCardTC(card._id));
    };

    const editPackHandler = () => {
        setModalActive(true);
    };
    const getEditedPack = () => {
        dispatch(updateCardTC(card._id, newQuestion, newAnswer));
        setModalActive(false);
    };

    return (
        <>
            <tr className={style.cardRow}>
                <td className={style.questionsCol}>{card.question}</td>
                <td className={style.answerCol}>{card.answer}</td>
                <td className={style.updatedCol}>{updated}</td>
                <td className={style.gradeCol}>{card.grade}</td>
                {isMyPack &&
                <td className={style.actions}>
                    <div className={style.actionsRow}
                    >
                    </div>
                </td>}

            </tr>
        </>
    );
});

