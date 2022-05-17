import React, {useEffect, useState} from 'react';
import {CardType} from "../../../api/cardsApi";
import {getCardsTC} from "../../../bll/cards/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {useParams} from "react-router-dom";
import {Button} from "../../common/Button/Button";


const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}


export const LearnPage = () => {
    const cards = useAppSelector(state => state.cards.cards);
    const [first, setFirst] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const urlParams = useParams<'*'>();
    const cardsPack_id = urlParams['*'];
    console.log(cards)

    const [card, setCard] = useState<CardType>({
        _id: "",
        cardsPack_id: "",

        answer: "",
        question: "",

        grade: 0,
        shots: 0,

        user_id: "",
        created: "",
        updated: "",
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (first) {
            dispatch(getCardsTC(cardsPack_id));
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));

    }, [dispatch, cardsPack_id, cards, first]);


    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }


    return (
        <div>
            LearnPage
            <div>{card.question}</div>
            <div>
                <Button onClick={() => setIsChecked(true)}>check</Button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <Button key={'grade-' + i} onClick={() => {
                        }}>{g}</Button>
                    ))}

                    <div><Button onClick={onNext}>next</Button></div>
                </>
            )}
        </div>
    );
};

