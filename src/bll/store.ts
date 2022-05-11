import {combineReducers } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {LoginActionsType, loginReducer} from "./auth/login/login-reducer";
import {SignUpActionsType, registrationReducer} from "./auth/registration/registration-reducer";
import {ProfileActionsType, profileReducer} from "./profile/profile-reducer";
import {RecoverActionsType, recoverReducer} from './auth/recover/recover-reducer';
import {NewPasswordActionsType, newPasswordReducer} from './auth/newPassword/new-password-reducer';
import {AppActionsType, appReducer} from './app/app-reducer';
import {configureStore, Action} from "@reduxjs/toolkit";
import { cardsReducer } from '../ui/pages/cards/cards-reducer';


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recover: recoverReducer,
    newPassword: newPasswordReducer,
    app: appReducer,
    cards: cardsReducer
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

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>
export type AppThunk = ThunkDispatch<AppStateType, void, Action>
export type NullableType<T> = null | T

// @ts-ignore
window.store = store;