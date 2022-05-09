import { cardsAPI, CardType } from './cardsApi';
import { useAppDispatch, useAppSelector } from 'src/bll/hooks';

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
}

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionTypes): CardsInitialStateType => {
    switch (action.type) {

        default:
            return state
    }
}


//thunks
export const getCardsTC = () => async (dispatch: useAppDispatch, getState: useAppSelector) => {
    const params = getState().cards.params
    // dispatch(setAppIsLoading(true))
    try {
        const data = await cardsAPI.getCards(params)

    } catch (e) {

    } finally {
        // dispatch(setAppIsLoading(false))
    }
}

export const deleteCardTC = (id: string) => async (dispatch: useAppDispatch) => {
    // dispatch(appActions.setAppIsLoading(true))
    try {
        await cardsAPI.deleteCard(id)

    } catch (e) {
    } finally {
        // dispatch(setAppIsLoading(false))
    }
}

export const addCardTC = (cardsPack_id: string, question: string, answer: string) => async (dispatch: useAppDispatch) => {

    // dispatch(appActions.setAppIsLoading(true))
    try {
        await cardsAPI.addCard(card)

    } catch (e) {

    } finally {
        // dispatch(appActions.setAppIsLoading(false))
    }
}

export const updateCardTC = (_id: string, question: string, answer: string) => async (dispatch: useAppDispatch) => {

    // dispatch(setAppIsLoading(true))
    try {
        await cardsAPI.updateCard(card)

    } catch (e) {

    } finally {
        // dispatch(setAppIsLoading(false))
    }
}

//types
export type CardsInitialStateType = typeof cardsInitialState
export type CardsActionTypes = any
export type CardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number,
    max: number,
    sortCards: string
    page: number
    pageCount: number
}
// export type CardsSortFieldsType = 'answer' | 'question' | 'updated' | 'grade'