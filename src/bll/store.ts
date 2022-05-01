import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "./auth/login/login-reducer";
import {registrationReducer} from "./auth/registration/registration-reducer";
import {profileReducer} from "./profile/profile-reducer";
import {recoverReducer} from "./auth/recover/recover-reducer";
import {newPasswordReducer} from "./auth/newPassword/new-password-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    recover: recoverReducer,
    newPassword: newPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;