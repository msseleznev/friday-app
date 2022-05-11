import { CardType } from '../cardsApi';
import React from 'react';
import s from './Card.module.scss';
import { SuperButton } from '../../../common/superButton/SuperButton';

type CardPropsType = {
  card: CardType
}
export const Card = React.memo(({ card, ...props }: CardPropsType) => {

  return (
    <div className={s.cardRow}>
      <div className={s.question}>{card.question}</div>
      <div className={s.answer}>{card.answer}</div>
      <div className={s.updated}>{card.updated}</div>
      <div>
        <SuperButton red>delete</SuperButton>
        <SuperButton>edit</SuperButton>
      </div>
    </div>
  );
});