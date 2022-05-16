import { cardsAPI, CardType } from '../../../../api/cardsApi';
import React, { useState } from 'react';
import { SuperButton } from '../../../common/superButton/SuperButton';
import { useAppDispatch, useAppSelector } from '../../../../bll/hooks';
import styled from 'styled-components';
import { deleteCardTC, updateCardTC } from '../../../../bll/cards/cards-reducer';
import { InputText } from '../../../common/InputText/InputText';
import { Button } from '../../../common/Button/Button';
import Modal from '../../../common/Modal/Modal';
import { editPackTC } from '../../../../bll/packs/packs-reducer';

type CardPropsType = {
  card: CardType
  cardsPack_id: string
}
export const Card = React.memo(({ card, cardsPack_id, ...props }: CardPropsType) => {

  const [modalActive, setModalActive] = useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState(card.question);
  const [newAnswer, setNewAnswer] = useState(card.answer);

  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.profile.user._id);
  const updated = card.updated.slice(0, 10).split('-').reverse().join('.');

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
    <CardWrap>
      <div className={'question'}>{card.question}</div>
      <div className={'answer'}>{card.answer}</div>
      <div className={'updated'}>{updated}</div>
      <div className={'grade'}>{card.grade}</div>
      <div className={'actions'}>
        {card.user_id === userId &&
        <Button red onClick={deleteCardHandler}>delete</Button>}
        {card.user_id === userId &&
        <Button onClick={editPackHandler}>edit</Button>}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <h3 style={{ margin: 10 }}>Edit card</h3>
        <p>Question</p>
        <InputText value={newQuestion} onChangeText={setNewQuestion} />
        <p>Answer</p>
        <InputText value={newAnswer} onChangeText={setNewAnswer} />
        <Button style={{ marginTop: 20 }} onClick={getEditedPack}>Save</Button>
      </Modal>
    </CardWrap>
  );
});

const CardWrap = styled.div`
  display: flex;
  min-height: 50px;
  margin-left: 10px;

  .question {
    width: 250px;
  }

  .answer {
    width: 250px;
  }

  .updated {
    width: 120px;
  }

  .grade {
    margin-left: 15px;
    width: 40px;
  }

  .actions {
    display: flex;
    justify-content: center;
    width: 180px;
  }


`;