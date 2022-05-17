import {combineReducers} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {LoginActionsType, loginReducer} from "./auth/login/login-reducer";
import {SignUpActionsType, registrationReducer} from "./auth/registration/registration-reducer";
import {ProfileActionsType, profileReducer} from "./profile/profile-reducer";
import {RecoverActionsType, recoverReducer} from './auth/recover/recover-reducer';
import {NewPasswordActionsType, newPasswordReducer} from './auth/newPassword/new-password-reducer';
import {AppActionsType, appReducer} from './app/app-reducer';
import {configureStore} from "@reduxjs/toolkit";
import {PacksActionsType, packsReducer} from "./packs/packs-reducer";
import { CardsActionTypes, cardsReducer } from './cards/cards-reducer';
import {LearnActionsType, learnReducer} from './learn/learnReducer';


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recover: recoverReducer,
    newPassword: newPasswordReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn:learnReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export type ActionsType =
    | ProfileActionsType
    | AppActionsType
    | LoginActionsType
    | SignUpActionsType
    | RecoverActionsType
    | NewPasswordActionsType
    | PacksActionsType
    | CardsActionTypes
    | LearnActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>
export type LessActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type NullableType<T> = null | T

// @ts-ignore
window.store = store;