import {
  cardsAPI,
  CardType,
  GetCardType,
  NewCardType,
} from '../../api/cardsApi';
import { setAppError, setIsAppFetching } from '../app/app-reducer';
import axios, { AxiosError } from 'axios';
import { AppThunk, LessActionTypes } from '../store';


const cardsInitialState = {
  cards: [] as CardType[],
  params: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 5,
    sortCards: '0grade',
    page: 1,
    pageCount: 10,
  } as CardsParamsType,
  cardsTotalCount: 0,
  packName: '',
};

// R E D U C E R

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionTypes): CardsInitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
        case 'SET_CARDS_TOTAL_COUNT':
        case 'SET_PACK_NAME':
            return {...state, ...action.payload}
        case 'SET_CURRENT_PAGE':
        case 'SET_ANSWER_SEARCH':
        case 'SET_QUESTION_SEARCH':
        case 'SET_SORT_CARDS':
        case 'SET_PACK_ID':
        case 'SET_CARDS_PAGE_COUNT':
            return {...state, params: {...state.params, ...action.payload}}
        default:
            return state
    }
}

// A C T I O N S

export const cardsActions = {
    setCards: (cards: CardType[]) => ({type: 'SET_CARDS', payload: {cards}} as const),
    setPackId: (cardsPack_id: string) => ({type: 'SET_PACK_ID', payload: {cardsPack_id}} as const),
    setCardsTotalCount: (cardsTotalCount: number) =>
    ({type: 'SET_CARDS_TOTAL_COUNT', payload: {cardsTotalCount}} as const),
    setCardsPageCount: (pageCount: number) => ({type: 'SET_CARDS_PAGE_COUNT', payload: {pageCount}} as const),
    setSortCards: (sortCards: string) => ({type: 'SET_SORT_CARDS', payload: {sortCards}} as const),
    setCurrentPage: (page: number) => ({type: 'SET_CURRENT_PAGE', payload: {page}} as const),
    setAnswerSearch: (cardAnswer: string) => ({type: 'SET_ANSWER_SEARCH', payload: {cardAnswer}} as const),
    setQuestionSearch: (cardQuestion: string) => ({type: 'SET_QUESTION_SEARCH', payload: {cardQuestion}} as const),
    setPackName: (packName: string) => ({type: 'SET_PACK_NAME', payload: {packName}} as const),
}

// T H U N K

export const getCardsTC = (cardsPack_id?: string): AppThunk => async (dispatch, getState) => {
        const params = getState().cards.params
        console.log(params);
        if(!params.cardsPack_id && cardsPack_id) {
        dispatch(cardsActions.setPackId(cardsPack_id))
        }
        dispatch(setIsAppFetching(true))
    try {
        const data = await cardsAPI.getCards(params)
        dispatch(cardsActions.setCardsTotalCount(data.cardsTotalCount))
        dispatch(cardsActions.setCards(data.cards))
  } catch (e: any) {
            const data = e?.response?.data;
            if (axios.isAxiosError(e) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(e.message + '. More details in the console')))
  } finally {
        dispatch(setIsAppFetching(false))
  }
}

export const addCardTC = (payload: AddCartType): AppThunk => async (dispatch) => {
    const card: NewCardType = payload
    dispatch(setIsAppFetching(true))
    try {
        await cardsAPI.addCard(card)
        await dispatch(getCardsTC())
    } catch (e: any) {
            const data = e?.response?.data;
            if (axios.isAxiosError(e) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(e.message + '. More details in the console')))
  } finally {
        dispatch(setIsAppFetching(false))
  }
}

export const deleteCardTC = (cardId: string): AppThunk => async (dispatch) => {
    dispatch(setIsAppFetching(true))
    try {
        await cardsAPI.deleteCard(cardId)
        await dispatch(getCardsTC())
    } catch (e: any) {
            const data = e?.response?.data;
            if (axios.isAxiosError(e) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(e.message + '. More details in the console')))
  } finally {
        dispatch(setIsAppFetching(false))
  }
}

export const updateCard = (_id: string, question: string, answer: string): AppThunk => async (dispatch) => {
    const card: any = {card: {_id, question, answer}}
    dispatch(setIsAppFetching(true))
    try {
        await cardsAPI.updateCard(card)
        await dispatch(getCardsTC())
    } catch (e: any) {
            const data = e?.response?.data;
            if (axios.isAxiosError(e) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(e.message + '. More details in the console')))
    } finally {
        dispatch(setIsAppFetching(false))
    }
}



// T Y P E S

export type CardsInitialStateType = typeof cardsInitialState

export type CardsActionTypes = LessActionTypes<typeof cardsActions>

export type CardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number,
  max?: number,
  sortCards?: string
  page?: number
  pageCount?: number
}

type AddCartType = {
  card: {
  cardsPack_id: string
  question: string
  answer: string
  }
}
