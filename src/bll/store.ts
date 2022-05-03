import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {loginReducer} from "./auth/login/login-reducer";
import {registrationReducer} from "./auth/registration/registration-reducer";
import {ProfileActionsType, profileReducer} from "./profile/profile-reducer";
import {recoverReducer} from './recover/recover-reducer';
import {newPasswordReducer} from './newPassword/new-password-reducer';



const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recover: recoverReducer,
    newPassword: newPasswordReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export type ActionsType = ProfileActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsType>
export type NullableType<T> = null | T

// @ts-ignore
window.store = store;