import s from './CardsPage.module.css';
import React, { useEffect, useState } from 'react';
import { addCardTC, getCardsTC, sortCardsAC } from '../../../bll/cards/cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { Navigate, useParams } from 'react-router-dom';
import { Card } from './Card/Card';
import { PATH } from '../../routes/RoutesApp';
import { SuperButton } from '../../common/superButton/SuperButton';
import Modal from '../../common/Modal/Modal';
import { InputText } from '../../common/InputText/InputText';

export const CardsPage = () => {
  const cards = useAppSelector(state => state.cards.cards);
  const params = useAppSelector(state => state.cards.params);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const dispatch = useAppDispatch();

  const [sortParams, setSortParams] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [cardQuestion, setCardQuestion] = useState<string>('');
  const [cardAnswer, setCardAnswer] = useState<string>('');


  const urlParams = useParams<'*'>() as { '*': string };
  const cardsPack_id = urlParams['*'];


  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id }));
  }, [params])





  const createCardHandler = () => {
    dispatch(addCardTC({ card: { cardsPack_id, question: cardQuestion, answer: cardAnswer } }));
    setModalActive(false);
  };

  const sortHandler = (e: any) => {
    if (e.target.dataset) {
      const trigger = e.currentTarget.dataset.sort;
      dispatch(sortCardsAC({ sortCards: `${Number(sortParams)}${trigger}` }));
      setSortParams(!sortParams);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.cardsBlock}>

      <div className={s.cardsContainer}>

        <div className={s.contentBlock}>

          <div className={s.searchBlock}>
            <input />
            <input />
            <SuperButton onClick={() => setModalActive(true)}>+ Card</SuperButton>
          </div>

          <div className={s.tableBlock}>
            <div className={s.tableHeader}>
              <div className={s.question}
                   onClick={sortHandler}
                   data-sort='question'>Question
              </div>
              <div className={s.answer}
                   onClick={sortHandler}
                   data-sort='cardsCount'>Answer
              </div>
              <div className={s.updated}
                   onClick={sortHandler}
                   data-sort='updated'>Last Updated
              </div>
              <div className={s.actions}>Actions</div>
            </div>
            {cards.map(card => <Card key={card._id} card={card} />)}
          </div>
          <div className={s.paginationBlock}>Pagination</div>

        </div>
      </div>

      <Modal active={modalActive} setActive={setModalActive}>
        <h4>Add card</h4>
        <p>Question</p>
       <InputText value={cardQuestion} onChangeText={setCardQuestion}/>
        <p>Answer</p>
       <InputText value={cardAnswer} onChangeText={setCardAnswer}/>
        <p>Attach image</p>
        <SuperButton onClick={createCardHandler}>Create card</SuperButton>
      </Modal>

    </div>

  );
};
