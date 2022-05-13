import s from './CardsPage.module.css';
import React, {useEffect, useState} from 'react';
import {getCardsTC, sortCardsAC} from './cards-reducer';
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {Navigate, useParams} from 'react-router-dom';
import {Card} from './Card/Card';
import {PATH} from '../../routes/RoutesApp';
import {SuperButton} from '../../common/superButton/SuperButton';
import {SuperInputText} from '../../common/superInputText/SuperInputText';
import Modal from '../../common/Modal/Modal';
import {Paginator} from '../../common/Paginator/Paginator';

export const CardsPage = () => {
  const cards = useAppSelector(state => state.cards.cards);
  const params = useAppSelector(state => state.cards.params);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const dispatch = useAppDispatch();

  const [sortParams, setSortParams] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);


  const {packId} = useParams<{ packId: string }>();

  useEffect(() => {
    dispatch(getCardsTC(packId ? packId : ''));
  }, [params]);

  const sortHandler = (e: any) => {
    if (e.target.dataset) {
      const trigger = e.currentTarget.dataset.sort
      dispatch(sortCardsAC({sortCards: `${Number(sortParams)}${trigger}`}))
      setSortParams(!sortParams)
    }
  };
  const onChangePage = (pageNumber: number) => {

  }
  const onChangePageSize = (pageCount: number) => {

  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
      <div className={s.cardsBlock}>

        <div className={s.cardsContainer}>

          <div className={s.contentBlock}>

            <div className={s.searchBlock}>
              <input/>
              <input/>
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
              {cards.map(card => <Card key={card._id} card={card}/>)}
            </div>
            <div className={s.paginationBlock}>
              <Paginator portionSize={5}
                         currentPage={1}
                         pageSize={10}
                         totalItemsCount={50}
                         onChangePage={onChangePage}
                         onChangePageSize={onChangePageSize}/>
            </div>

          </div>
        </div>

        <Modal active={modalActive} setActive={setModalActive}>
          <h4>Add card</h4>
          <p>Question</p>
          <SuperInputText></SuperInputText>
          <p>Answer</p>
          <SuperInputText></SuperInputText>
          <p>Attach image</p>
          <SuperButton>Create card</SuperButton>
        </Modal>

      </div>

  );
};
