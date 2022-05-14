// import {
//   cardsAPI,
//   CardType,
//   GetCardType,
//   NewCardType,
// } from '../../ui/pages/cards/cardsApi';
// import { setIsAppFetching } from '../app/app-reducer';
// import {
//   createAsyncThunk,
//   createSlice,
//   PayloadAction,
// } from '@reduxjs/toolkit';
// import { AppDispatch, AppStateType, NullableType } from '../store';
//
// const cardsInitialState = {
//   cards: [] as CardType[],
//   params: {
//     cardAnswer: '',
//     cardQuestion: '',
//     cardsPack_id: '',
//     min: 0,
//     max: 5,
//     sortCards: '0grade',
//     page: 1,
//     pageCount: 10,
//   } as CardsParamsType,
//   cardsTotalCount: 0,
//   packName: '',
// };
//
//
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
// const slice = createSlice({
//   name: 'cards',
//   initialState: cardsInitialState,
//   reducers: {
//     setCardsAC(state, action: PayloadAction<{ cards: CardType[] }>) {
//       state.cards = action.payload.cards;
//     },
//     sortCardsAC(state, action: PayloadAction<{ sortCards: string }>) {
//       return {
//         ...state,
//         params: { ...state.params, sortCards: action.payload.sortCards },
//       };
//     },
//     setCardsTotalCountAC(state, action: PayloadAction<{ cardsTotalCount: NullableType<number> }>) {
//
//     },
//     setPackIdAC(state, action: PayloadAction<{ cardsPack_id: string }>) {
//       state.params.cardsPack_id = action.payload.cardsPack_id;
//     },
//   },
//   // extraReducers: builder => builder
//   // .addCase(addCardTC.fulfilled,(state) =>{
//   //
//   // } )
// });
//
// export const cardsReducer = slice.reducer;
//
// //ACTION CREATORS
// export const {
//   setCardsAC,
//   setCardsTotalCountAC,
//   setPackIdAC,
//   sortCardsAC,
// } = slice.actions;
//
//
// // export const deleteCardTC = createAsyncThunk<any, string, {state: AppStateType}>
// //
// // (id: string) => async (dispatch: AppDispatch) => {
// //   dispatch(setIsAppFetching(true));
// //   try {
// //     // await cardsAPI.deleteCard(id);
// //
// //   } catch (e) {
// //   } finally {
// //     dispatch(setIsAppFetching(false));
// //   }
// // };
//
//
// export const updateCardTC = (_id: string, question: string, answer: string) => async (dispatch: AppDispatch) => {
//
//   dispatch(setIsAppFetching(true));
//   try {
//     // await cardsAPI.updateCard(card);
//
//   } catch (e) {
//
//   } finally {
//     dispatch(setIsAppFetching(false));
//   }
// };
//
// //types
// export type CardsParamsType = {
//   cardAnswer?: string
//   cardQuestion?: string
//   cardsPack_id?: string
//   min?: number,
//   max?: number,
//   sortCards?: string
//   page?: number
//   pageCount?: number
// }
export const fakeExport = 'really fake'