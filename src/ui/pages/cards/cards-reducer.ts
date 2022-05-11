import { cardsAPI, CardType } from './cardsApi';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { setIsAppFetching } from '../../../bll/app/app-reducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppStateType, AppThunk, NullableType } from '../../../bll/store';
import { Dispatch } from 'redux';

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

const slice = createSlice({
  name: 'cards',
  initialState: cardsInitialState,
  reducers: {
    setCardsAC(state, action: PayloadAction<{cards: CardType[]}>) {
      return {...state, cards: action.payload.cards}
    },
    setCardsTotalCountAC(state, action: PayloadAction<{cardsTotalCount: NullableType<number>}>) {

    },
  },
});

export const cardsReducer = slice.reducer;
export const { setCardsAC, setCardsTotalCountAC } = slice.actions;


//thunks


export const getCardsTC = createAsyncThunk(
  'cards/getCards',
  async (packId) => {
    const params = getState().cards.params;
    dispatch(setIsAppFetching(true));
    try {
      const data = await cardsAPI.getCards(params);
      dispatch(setCardsAC({ cards: data.cards }))
      dispatch(setCardsTotalCountAC({ cardsTotalCount: data.cardsTotalCount }))
    } catch (e) {

    } finally {
      dispatch(setIsAppFetching(false));
    }
  }
)

// export const getCardsTC = () => async (dispatch: AppDispatch , getState: AppStateType) => {
//   const params = getState().cards.params;
//   dispatch(setIsAppFetching(true));
//   try {
//     const data = await cardsAPI.getCards(params);
//     dispatch(setCardsAC({cards: data.cards}))
//     dispatch(setCardsTotalCountAC({cardsTotalCount: data.cardsTotalCount}))
//   } catch (e) {
//
//   } finally {
//     dispatch(setIsAppFetching(false));
//   }
// };

export const deleteCardTC = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(setIsAppFetching(true));
  try {
    await cardsAPI.deleteCard(id);

  } catch (e) {
  } finally {
    dispatch(setIsAppFetching(false));
  }
};

export const addCardTC = (cardsPack_id: string, question: string, answer: string) => async (dispatch: AppDispatch) => {

  dispatch(setIsAppFetching(true));
  try {
    await cardsAPI.addCard(card);

  } catch (e) {

  } finally {
    dispatch(setIsAppFetching(false));
  }
};

export const updateCardTC = (_id: string, question: string, answer: string) => async (dispatch: AppDispatch) => {

  dispatch(setIsAppFetching(true));
  try {
    await cardsAPI.updateCard(card);

  } catch (e) {

  } finally {
    dispatch(setIsAppFetching(false));
  }
};

//types
export type CardsInitialStateType = typeof cardsInitialState
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