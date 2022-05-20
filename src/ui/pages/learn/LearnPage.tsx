import React, {useEffect, useState} from 'react';
import style from './Learn.module.scss';
import paperStyle from '../../common/styles/classes.module.scss';
import {Preloader} from '../../common/Preloader/Preloader';
import {Button} from '../../common/Button/Button';
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import {PATH} from '../../routes/RoutesApp';
import {Radio} from '../../common/Radio/Radio';
import {setCards, setCurrentCard, setRate, startLearn} from "../../../bll/learn/learnReducer";
import {CardType} from "../../../api/cardsApi";

export const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id};
        }
        , {sum: 0, id: -1});
    // console.log('test: ', sum, rand, res);
    return cards[res.id + 1];
};

export const LearnPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cards = useAppSelector(state => state.learn.cards);
    const card = useAppSelector(state => state.learn.currentCard);
    const isAppFetching = useAppSelector(state => state.app.isAppFetching);


    const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);

    const gradesArray = ['1', '2', '3', '4', '5'];
    const [radioValue, setRadioValue] = useState<string>('');

    const onChangeGrades = (options: any) => setRadioValue(options);

    const urlParams = useParams<'*'>() as { '*': string };
    const cardsPack_id = urlParams['*'].split('/')[0];
    const packName = urlParams['*'].split('/')[1];
    useEffect(() => {
        if (cards.length > 0) //исключаем вызов рандома при пустом массиве
            dispatch(setCurrentCard(getCard(cards)))
    }, [dispatch, cards])


    useEffect(() => {
        dispatch(startLearn(cardsPack_id));
    }, [dispatch, cardsPack_id]);


    const onCancel = () => {
        navigate(PATH.PACKS);
        dispatch(setCards([]))
    };
    const onShowAnswer = () => {
        setIsAnswerOpen(true);
    };
    const onSkip = () => {
        setIsAnswerOpen(false);
        dispatch(setCurrentCard(getCard(cards)))
    };
    const onRate = () => {
        dispatch(setRate(+radioValue))
        setIsAnswerOpen(false);
        setRadioValue('')
    };
    return (
        <div className={style.learnBlock}>
            {isAppFetching ? <Preloader size={'20px'} color={'#42A5F5'}/> :
                <div className={`${style.learnContainer} ${paperStyle.shadowPaper}`}
                     data-z='paper'>
                    <div className={style.packName}><h3><span>Learn pack:</span> {packName}</h3></div>
                    <div className={style.question}>
                        <span>Question: </span> {card.question}
                    </div>
                    {!isAnswerOpen ?
                        <div className={style.buttonSet1}>
                            <Button onClick={onCancel}>Cancel</Button>
                            <Button onClick={onShowAnswer}>Show answer</Button>
                        </div>
                        : <div className={style.showAnswer}>
                            <div className={style.answer}>
                                <span>Answer: </span> {card.answer}
                            </div>
                            <div className={style.radioBlock}>
                                <span className={style.title}>Don't know </span>
                                <Radio options={gradesArray}
                                       onChangeOption={onChangeGrades}
                                       value={radioValue}/>
                                <span className={style.title}>Know</span>
                            </div>
                            <div className={style.buttonSet2}>
                                <Button onClick={onSkip}>Skip</Button>
                                {radioValue !== '' && <Button onClick={onRate}>Rate</Button>}
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
};