import React, {useEffect, useState} from 'react';
import style from './Learn.module.scss';
import paperStyle from '../../common/styles/classes.module.scss';
import {Preloader} from '../../common/Preloader/Preloader';
import {Button} from '../../common/Button/Button';
import {useAppDispatch, useAppSelector} from '../../../bll/hooks';
import {useNavigate, useParams} from 'react-router-dom';
import {getCardsTC} from '../../../bll/cards/cards-reducer';
import {PATH} from '../../routes/RoutesApp';
import {CardType} from '../../../api/cardsApi';
import {Radio} from '../../common/Radio/Radio';
import {getCard, setCurrentCard, setRate, startLearn} from "../../../bll/learn/learnReducer";

export const LearnPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const urlParams = useParams<'*'>() as { '*': string };
    const cardsPack_id = urlParams['*'];


    const cards = useAppSelector(state => state.learn.cards);
    // const card = useAppSelector(state => state.learn.currentCard);
    const packName = useAppSelector(state => state.cards.packName);
    const isAppFetching = useAppSelector(state => state.app.isAppFetching);
    const [firstRender, setFirstRender] = useState<boolean>(true)

    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        updated: '',
        user_id: '',
        created: '',
    });
    console.log(card)

    useEffect(() => {
        if (firstRender) {
            dispatch(startLearn(cardsPack_id));
            setFirstRender(false)
        }
        if (cards.length > 0) setCard(getCard(cards));

    }, [dispatch, cardsPack_id, cards, firstRender]);


    const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);

    const gradesArray = ['1', '2', '3', '4', '5'];
    const [grade, setGrade] = useState<string>('');

    const onChangeGrades = (options: any) => setGrade(options);





    const onCancel = () => {
        navigate(PATH.PACKS);
    };
    const onShowAnswer = () => {
        setIsAnswerOpen(true);
    };
    const onSkip = () => {
        setIsAnswerOpen(false);
    };
    const onRate = () => {

        dispatch(setRate(+grade, card._id))
        setIsAnswerOpen(false);
        setGrade('')
    };
    return (
        <div className={style.learnBlock}>
            {isAppFetching ? <Preloader size={'20px'} color={'#42A5F5'}/> :
                <div className={`${style.learnContainer} ${paperStyle.shadowPaper}`}
                     data-z='paper'>
                    <div className={style.packName}><h3>Learn pack: {packName}</h3></div>
                    <div className={style.question}><h4>
                        {card.question}
                    </h4></div>
                    {!isAnswerOpen ?
                        <div className={style.buttonSet1}>
                            <Button onClick={onCancel}>Cancel</Button>
                            <Button onClick={onShowAnswer}>Show answer</Button>
                        </div>
                        : <div className={style.showAnswer}>
                            <div><h4>
                                {card.answer}
                            </h4></div>
                            <div className={style.radioBlock}>
                                Don't know <Radio options={gradesArray} onChangeOption={onChangeGrades}
                                                  value={grade}/> Know
                            </div>
                            <div className={style.buttonSet2}>
                                <Button onClick={onSkip}>Skip</Button>
                                {grade !== '' && <Button onClick={onRate}>Rate</Button>}
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
};