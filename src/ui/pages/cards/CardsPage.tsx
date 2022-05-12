import s from './CardsPage.module.css';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getCardsTC, setPackIdAC } from './cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { AppThunk } from '../../../bll/store';
import { CardType } from './cardsApi';
import { Navigate, useParams } from 'react-router-dom';
import { SuperButton } from '../../common/superButton/SuperButton';
import { Card } from './Card/Card';
import { getPacksTC } from '../../../bll/packs/packs-reducer';
import { PATH } from '../../routes/RoutesApp';

export const CardsPage = () => {
  const cards = useAppSelector(state => state.cards.cards);
  const params = useAppSelector(state => state.cards.params);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const dispatch = useAppDispatch();

  const { packId } = useParams<{ packId: string }>();

  useEffect(() => {

    dispatch(getCardsTC(packId ? packId : ''));
  }, [params]);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.cardsBlock}>
      <div className={s.cardsContainer}>
        {cards.map(card => <Card key={card._id} card={card}/>)}
      </div>
    </div>

  );
};
