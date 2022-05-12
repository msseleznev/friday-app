import { cardsAPI, CardType } from './cardsApi';
import { useAppDispatch, useAppSelector } from '../../../bll/hooks';
import { setIsAppFetching } from '../../../bll/app/app-reducer';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppStateType, AppThunk, NullableType } from '../../../bll/store';
import { Dispatch } from 'redux';
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState';
import { packsAPI, PacksParamsType } from '../../../api/api';
import { PacksActionsType } from '../../../bll/packs/packs-reducer';

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


export const getCardsTC = createAsyncThunk<any, string, { state: AppStateType }>('cards/getCards',
  async (packId: string, thunkAPI) => {
    thunkAPI.dispatch(setIsAppFetching(true));
    if (packId) {
      thunkAPI.dispatch(setPackIdAC({ packId }));
    }
    try {
      const params = thunkAPI.getState().cards.params

      const data = await cardsAPI.getCards(params);
      thunkAPI.dispatch(setCardsAC({ cards: data.cards }));
      thunkAPI.dispatch(setCardsTotalCountAC({ cardsTotalCount: data.cardsTotalCount }));
    } catch (e) {

      console.warn(e);
    } finally {
      thunkAPI.dispatch(setIsAppFetching(false));
    }
  },
);

const slice = createSlice({
  name: 'cards',
  initialState: cardsInitialState,
  reducers: {
    setCardsAC(state, action: PayloadAction<{ cards: CardType[] }>) {
      return { ...state, cards: action.payload.cards };
    },
    sortCardsAC(state, action: PayloadAction<{sortCards: string}>) {
      return {...state, params: {...state.params, sortCards: action.payload.sortCards}}
    },
    setCardsTotalCountAC(state, action: PayloadAction<{ cardsTotalCount: NullableType<number> }>) {

    },
    setPackIdAC(state, action: PayloadAction<{ packId: string }>) {
      return {
        ...state,
        params: { ...state.params, cardsPack_id: action.payload.packId },
      };
    },
  },
});

export const cardsReducer = slice.reducer;

//ACTION CREATORS
export const { setCardsAC, setCardsTotalCountAC, setPackIdAC, sortCardsAC } = slice.actions;


//thunks


//
// export const deleteCardTC = createAsyncThunk<any, string, {state: AppStateType}>
//
// (id: string) => async (dispatch: AppDispatch) => {
//   dispatch(setIsAppFetching(true));
//   try {
//     // await cardsAPI.deleteCard(id);
//
//   } catch (e) {
//   } finally {
//     dispatch(setIsAppFetching(false));
//   }
// };

export const addCardTC = (cardsPack_id: string, question: string, answer: string) => async (dispatch: AppDispatch) => {

  dispatch(setIsAppFetching(true));
  try {
    // await cardsAPI.addCard(card);

  } catch (e) {

  } finally {
    dispatch(setIsAppFetching(false));
  }
};

export const updateCardTC = (_id: string, question: string, answer: string) => async (dispatch: AppDispatch) => {

  dispatch(setIsAppFetching(true));
  try {
    // await cardsAPI.updateCard(card);

  } catch (e) {

  } finally {
    dispatch(setIsAppFetching(false));
  }
};

//types
export type CardsInitialStateType = typeof cardsInitialState
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
// export type CardsSortFieldsType = 'answer' | 'question' | 'updated' | 'grade'