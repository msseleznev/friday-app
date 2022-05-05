import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {LoginActionsType, loginReducer} from "./auth/login/login-reducer";
import {SignUpActionsType, registrationReducer} from "./auth/registration/registration-reducer";
import {ProfileActionsType, profileReducer} from "./profile/profile-reducer";
import {RecoverActionsType, recoverReducer} from './auth/recover/recover-reducer';
import {NewPasswordActionsType, newPasswordReducer} from './auth/newPassword/new-password-reducer';
import {AppActionsType, appReducer} from './app/app-reducer';


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recover: recoverReducer,
    newPassword: newPasswordReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export type ActionsType =
    | ProfileActionsType
    | AppActionsType
    | LoginActionsType
    | SignUpActionsType
    | RecoverActionsType
    | NewPasswordActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>
export type NullableType<T> = null | T

// @ts-ignore
window.store = store;