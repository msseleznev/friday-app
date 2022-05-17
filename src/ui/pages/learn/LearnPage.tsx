import React, {useEffect, useState } from 'react';
import style from './Learn.module.scss';
import paperStyle from '../../common/styles/classes.module.scss';
import { Preloader } from '../../common/Preloader/Preloader';
import { Button } from '../../common/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getCardsTC } from '../../../bll/cards/cards-reducer';
import { PATH } from '../../routes/RoutesApp';
import { CardType } from '../../../api/cardsApi';
import { Radio } from '../../common/Radio/Radio';

export const LearnPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cards = useAppSelector(state => state.cards.cards);
  const packName = useAppSelector(state => state.cards.packName);
  const isAppFetching = useAppSelector(state => state.app.isAppFetching);

  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const [card, setCard] = useState<CardType>({
    _id: '',
    cardsPack_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
  });

  const gradesArray = ['1', '2', '3', '4', '5'];
  const [grade, onChangeOption] = useState('');
  const onChangeGrades = (options: any) => onChangeOption(options);

  const urlParams = useParams<'*'>() as { '*': string };
  const cardsPack_id = urlParams['*'];

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(cardsPack_id));
      setFirst(false);
    }
    if (cards.length > 0) setCard(getCard(cards));

  }, [dispatch, cardsPack_id, cards, first]);


  const onCancel = () => {
    navigate(PATH.PACKS);
  };
  const onShowAnswer = () => {
    setIsAnswerOpen(true);
  };
  const onSkip = () => {
    setIsAnswerOpen(false);
    if (cards.length > 0) {
      // dispatch
      setCard(getCard(cards));
    } else {
    }
  };
const onRate = () => {
    // dispatch(rateTC(card._id, Number(grade)))
    setIsAnswerOpen(false);
    if (cards.length > 0) {
      // dispatch
      setCard(getCard(cards));
    } else {
    }
  };

  return (
    <div className={style.learnBlock}>
      {isAppFetching ? <Preloader size={'20px'} color={'#42A5F5'} /> :
        <div className={`${style.learnContainer} ${paperStyle.shadowPaper}`}
             data-z='paper'>
          <div className={style.packName}><h3>Learn pack: {packName}</h3></div>
          <div className={style.question}><h4>{card.question}</h4></div>
          {!isAnswerOpen ?
            <div className={style.buttonSet1}>
              <Button onClick={onCancel}>Cancel</Button>
              <Button onClick={onShowAnswer}>Show answer</Button>
            </div>
            : <div className={style.showAnswer}>
              <div><h4>{card.answer}</h4></div>
              <div className={style.radioBlock}>
                Don't know <Radio options={gradesArray} onChangeOption={onChangeGrades} value={grade} /> Know
              </div>
              <div className={style.buttonSet2}>
                <Button onClick={onSkip}>Skip</Button>
                <Button onClick={onRate}>Rate</Button>
              </div>

            </div>
          }
        </div>
      }
    </div>
  );
};

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    }
    , { sum: 0, id: -1 });
  console.log('test: ', sum, rand, res);

  return cards[res.id + 1];
};
