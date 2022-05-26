import {cardsAPI, CardType, NewCardType, UpdateCardModelType,} from '../../api/cardsApi';
import {setAppError, setAppMessage, setIsAppFetching} from '../app/app-reducer';
import axios from 'axios';
import {AppThunk, LessActionTypes} from '../store';
import {MESSAGES_FOR_SUCCESS_BAR} from '../../ui/common/SnackBar/SnackBar';


const cardsInitialState = {
    cards: [] as CardType[],
    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: '',
        page: 1,
        pageCount: 10,
    } as Partial<Omit<CardsParamsType, 'page' | 'pageCount'>> & { page: number, pageCount: number },
    cardsTotalCount: 0,
    packName: '',
    packUserId: ''
};

// R E D U C E R

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionTypes): CardsInitialStateType => {
    switch (action.type) {
        case 'SET_CARDS':
        case 'SET_CARDS_TOTAL_COUNT':
        case 'SET_PACK_USER_ID':
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
    setPackUserId: (packUserId: string) => ({type: 'SET_PACK_USER_ID', payload: {packUserId}} as const),
}

// T H U N K

export const getCardsTC = (cardsPack_id?: string): AppThunk => async (dispatch, getState) => {
    const params = getState().cards.params
    if (!params.cardsPack_id && cardsPack_id) {
        dispatch(cardsActions.setPackId(cardsPack_id))
    }
    dispatch(setIsAppFetching(true))
    try {
        const params = getState().cards.params
        const data = await cardsAPI.getCards(params)
        dispatch(cardsActions.setPackUserId(data.packUserId))
        dispatch(cardsActions.setCardsTotalCount(data.cardsTotalCount))
        dispatch(cardsActions.setCards(data.cards))
        dispatch(cardsActions.setCurrentPage(1))
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
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.NEW_CARD_SUCCESSFULLY_ADDED))
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
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.CARD_SUCCESSFULLY_REMOVED))
    } catch (e: any) {
        const data = e?.response?.data;
        if (axios.isAxiosError(e) && data) {
            dispatch(setAppError(data.error || 'Some error occurred'));
        } else (dispatch(setAppError(e.message + '. More details in the console')))
    } finally {
        dispatch(setIsAppFetching(false))
    }
}

export const updateCardTC = (_id: string, question: string, answer: string, answerImg: string): AppThunk => async (dispatch) => {
    const card: UpdateCardModelType = {card: {_id, question, answer, answerImg}}
    dispatch(setIsAppFetching(true))
    try {
        await cardsAPI.updateCard(card)
        await dispatch(getCardsTC())
        dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.CARD_CHANGED_SUCCESSFULLY))
    } catch (e: any) {
        const data = e?.response?.data;
        if (axios.isAxiosError(e) && data) {
            dispatch(setAppError(data.error || 'Some error occurred'));
        } else (dispatch(setAppError(e.message + '. More details in the console')))
    } finally {
        dispatch(setIsAppFetching(false))
    }
}
export const getCardsByPage = (pageNumber: number, cardsPack_id?: string,): AppThunk => async (dispatch, getState) => {
    const {page, ...params} = getState().cards.params;
    const payload = {page: pageNumber, ...params}
    if (!params.cardsPack_id && cardsPack_id) {
        dispatch(cardsActions.setPackId(cardsPack_id))
    }
    dispatch(setIsAppFetching(true))
    try {
        const params = getState().cards.params
        const data = await cardsAPI.getCards(payload)
        dispatch(cardsActions.setPackUserId(data.packUserId))
        dispatch(cardsActions.setCardsTotalCount(data.cardsTotalCount))
        dispatch(cardsActions.setCards(data.cards))
        dispatch(cardsActions.setCurrentPage(pageNumber))
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
    answerImg?: string
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
        answerImg: string
    }
}
