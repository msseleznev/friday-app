import s from './CardsPage.module.scss';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getCardsTC } from './cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { AppThunk } from '../../../bll/store';
import { CardType } from './cardsApi';
import { useParams } from 'react-router-dom';
import { SuperButton } from '../../common/superButton/SuperButton';
import { Card } from './Card/Card';
import { getPacksTC } from '../../../bll/packs/packs-reducer';

export const CardsPage = () => {
  const cards = useAppSelector(state => state.cards.cards);
  const params = useAppSelector(state => state.cards.params)
  const dispatch = useAppDispatch();
  const {packId} = useParams<{ packId: string }>();



  useEffect(() => {
      dispatch(AC(packId))
      dispatch(getCardsTC(params));
  }, []);

  return (
    <div className={s.cardsBlock}>
      <div className={s.cardsContainer}>
        {cards.map(card => <Card key={card._id} card={card} />,
        )}
      </div>
    </div>

  );
};
