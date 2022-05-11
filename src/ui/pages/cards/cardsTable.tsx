import s from 'cardsTable.module.scss';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getCardsTC } from './cards-reducer';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { AppThunk } from '../../../bll/store';
import { CardType } from './cardsApi';

export const Cards = () => {
  const cards = useAppSelector(state => state.cards.cards);
  const
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCardsTC());
  }, []);

  return (
    <div className={s.cardsBlock}>
      <div className={s.cardsContainer}>
        {cards.map(card => <Card key={card._id} card={card}/>
        )}
      </div>
    </div>

  );
};

//Card Component

type CardPropsType = {
    card: CardType
}
export const Card = React.memo(({ card, ...props }: CardPropsType) => {

return (
  <div>{card.question} : {card.answer} : {card.updated}</div>
)
})