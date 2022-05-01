import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {loginReducer} from "./b1-login/login-reducer";
import {registrationReducer} from "./b2-registration/registration-reducer";
import {ProfileActionsType, profileReducer} from "./b3-profile/profile-reducer";
import {recoverReducer} from "./b4-recover/recover-reducer";
import {newPasswordReducer} from "./b5-newPassword/new-password-reducer";
import {TypedUseSelectorHook, useSelector} from 'react-redux';


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