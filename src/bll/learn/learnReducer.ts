import {cardsAPI, CardType} from '../../api/cardsApi';
import {AppThunk} from '../store';
import {setAppError, setIsAppFetching} from '../app/app-reducer';
import {cardsActions} from '../cards/cards-reducer';
import axios from 'axios';
import {setIsProfileFetching} from '../profile/profile-reducer';

export enum LEARN_ACTIONS_TYPE {
    SET_CARDS = 'cards/learn/SET_CARDS',
    SET_CURRENT_CARD = 'cards/learn/SET_CURRENT_CARD',
    SET_NEW_GRADE = 'cards/learn/SET_NEW_GRADE',
}

const learnInitialState = {
    cards: [] as CardType[],
    currentCard: {} as CardType,
}
export type LearnInitialStateType = typeof learnInitialState

export const learnReducer = (state: LearnInitialStateType = learnInitialState, action: LearnActionsType): LearnInitialStateType => {
    switch (action.type) {
        case LEARN_ACTIONS_TYPE.SET_CARDS:
        case LEARN_ACTIONS_TYPE.SET_CURRENT_CARD:
            return {
                ...state, ...action.payload
            }
        case LEARN_ACTIONS_TYPE.SET_NEW_GRADE:
            return {
                ...state,
                cards: state.cards.map(card => {
                    return card._id === action.cardId ?
                        {...card, grade: action.newGrade} : card
                })
            }

        default:
            return state
    }
};
export const setCards = (cards: CardType[]) => ({type: LEARN_ACTIONS_TYPE.SET_CARDS, payload: {cards}} as const);
export const setCurrentCard = (currentCard: CardType) => ({
    type: LEARN_ACTIONS_TYPE.SET_CURRENT_CARD,
    payload: {currentCard}
} as const);
export const setNewGrade = (newGrade: number, cardId: string) => {
    return {
        type: LEARN_ACTIONS_TYPE.SET_NEW_GRADE,
        newGrade, cardId
    } as const
};


export type LearnActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCurrentCard>
    | ReturnType<typeof setNewGrade>

export const startLearn = (cardsPack_id: string): AppThunk => (dispatch,) => {
    dispatch(setIsAppFetching(true));
    cardsAPI.getCards({cardsPack_id, pageCount: 1000000})
        .then(data => {
            dispatch(setCards(data.cards))
            // dispatch(setCurrentCard(getCard(data.cards)))
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(error.message + '. More details in the console')))
        })
        .finally(() => {
            dispatch(setIsProfileFetching(false))
            dispatch(setIsAppFetching(false));
        })
}

export const setRate = (grade: number, card_id: string): AppThunk => (dispatch, getState) => {

    dispatch(setIsAppFetching(true));
    cardsAPI.updateRate({grade, card_id})
        .then(updatedGrade => {
            dispatch(setNewGrade(updatedGrade.grade, card_id))
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(error.message + '. More details in the console')))
        })
        .finally(() => {
            dispatch(setIsProfileFetching(false))
            dispatch(setIsAppFetching(false));
        })
}

export const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id};
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res);
    return cards[res.id + 1];
};

