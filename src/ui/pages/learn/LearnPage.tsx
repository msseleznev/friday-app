import React, { useCallback, useEffect, useState } from 'react';
import style from './Learn.module.scss';
import paperStyle from '../../common/styles/classes.module.scss';
import { Preloader } from '../../common/Preloader/Preloader';
import { Button } from '../../common/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getCardsTC } from '../../../bll/cards/cards-reducer';
import { PATH } from '../../routes/RoutesApp';

export const LearnPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isAppFetching = useAppSelector(state => state.app.isAppFetching);
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const packName = useAppSelector(state => state.cards.packName)
  const urlParams = useParams<'*'>() as { '*': string };
  const cardsPack_id = urlParams['*'];

  const setAnswerOff = () => {
    setIsAnswerOpen(false);
  };

  useEffect(() => {
    dispatch(getCardsTC(cardsPack_id));
  }, []);

  const ShowAnswer = () => {
      // onClickNotOpen()
      setIsAnswerOpen(true)
  }
  const Cancel = () => {
    navigate(PATH.PACKS)
  }

  // const onClickStopLearning = () => {
  //     dispatch(learnActions.setRandomCard({} as CardType))
  //     dispatch(learnActions.setCards([]))
  //     onClickNotOpen()
  // }


  return (
    <div className={style.learnBlock}>
      {isAppFetching ? <Preloader size={'20px'} color={'#42A5F5'} /> :
        <div className={`${style.learnContainer} ${paperStyle.shadowPaper}`}
             data-z='paper'>
          <div className={style.packName}><h3>Learn: {packName}</h3></div>
          <div className={style.question_Buttons}>
            <div className={style.question}><h4>{}</h4></div>
            <div className={style.loginButtonBlock}>
              <Button onClick={Cancel}>Cancel</Button>
              <Button onClick={ShowAnswer}>Show answer</Button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export const RatePage = () => {

  return (
    <div></div>
  )
}

