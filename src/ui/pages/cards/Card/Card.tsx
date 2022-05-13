import { CardType } from '../cardsApi';
import React from 'react';
import { SuperButton } from '../../../common/superButton/SuperButton';
import { useAppSelector } from '../../../../bll/hooks';
import styled from 'styled-components';

type CardPropsType = {
  card: CardType
}
export const Card = React.memo(({ card, ...props }: CardPropsType) => {

  const userId = useAppSelector(state => state.profile.user._id);
  const updated = card.updated.slice(0, 10).split('-').reverse().join('.');


  return (
    <CardWrap>
      <div className={'question'}>{card.question}</div>
      <div className={'answer'}>{card.answer}</div>
      <div className={'updated'}>{updated}</div>
      <div className={'actions'}>
        {/*<SuperButton red>delete</SuperButton>*/}
        {/*<SuperButton>edit</SuperButton>*/}
        {card.user_id === userId && <SuperButton red>delete</SuperButton>}
        {card.user_id === userId && <SuperButton>edit</SuperButton>}
      </div>
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

  .actions {
    display: flex;
    justify-content: center;
    width: 180px;
  }


`;