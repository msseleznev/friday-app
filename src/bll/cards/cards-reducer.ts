import { cardsAPI, CardType, GetCardType } from '../../ui/pages/cards/cardsApi';
import { AppThunk, LessActionTypes } from '../store';
import { setAppError, setIsAppFetching } from '../app/app-reducer';
import axios, { AxiosError } from 'axios';


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

export const getCardsTC = (): AppThunk => async (dispatch, getState) => {
        const params = getState().cards.params
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

//
// export const addCardTC = (cardsPack_id: string, question: string, answer: string): AppThunk => async (dispatch) => {
//     const card: NewCardType = {card: {cardsPack_id, question, answer}}

//     try {
//         await cardsAPI.addCard(card)
//         await dispatch(getCards())
//     } catch (e) {

//     } finally {

//     }
// }

// export const getCardsTC = createAsyncThunk('cards/getCards',
//   async (payload: GetCardType, thunkAPI) => {
//     thunkAPI.dispatch(setIsAppFetching(true));
//     const state = thunkAPI.getState() as AppStateType;
//     if (payload.cardsPack_id) {
//       thunkAPI.dispatch(setPackIdAC({ cardsPack_id: payload.cardsPack_id }));
//     }
//     try {
//       const params = state.cards.params;
//       const data = await cardsAPI.getCards(params);
//
//       thunkAPI.dispatch(setCardsAC({ cards: data.cards }));
//       thunkAPI.dispatch(setCardsTotalCountAC({ cardsTotalCount: data.cardsTotalCount }));
//     } catch (e) {
//       console.warn(e);
//     } finally {
//       thunkAPI.dispatch(setIsAppFetching(false));
//     }
//   },
// );
//
// // Generic createAsyncThunk has <type of what thunk return, payloadCreator receive (what thunk receive in parameters), options for thunkAPI>
// export const addCardTC = createAsyncThunk(
//   'cards/addCard',
//   async (payload: NewCardType, { dispatch }) => {
//     dispatch(setIsAppFetching(true));
//     try {
//       const data = await cardsAPI.addCard({ ...payload })
//       dispatch(getCardsTC({ cardsPack_id: payload.card.cardsPack_id }))
//     } catch (e) {
//       console.warn(e);
//     } finally {
//       dispatch(setIsAppFetching(false));
//     }
//   },
// );
//
// type deleteCardPayloadType = {
//   cardId: string
//   cardsPack_id: string
// }
//
// export const deleteCardTC = createAsyncThunk(
//   'cards/deleteCard',
//   async (payload: deleteCardPayloadType, { dispatch }) => {
//     dispatch(setIsAppFetching(true));
//     return await cardsAPI.deleteCard(payload.cardId)
//       .then(() =>
//         dispatch(getCardsTC({ cardsPack_id: payload.cardsPack_id })),
//       )
//       .finally(() => {
//         dispatch(setIsAppFetching(false));
//       });
//   },
// );
//
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