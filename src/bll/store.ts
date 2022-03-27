import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "./b1-login/login-reducer";
import {registrationReducer} from "./b2-registration/registration-reducer";
import {profileReducer} from "./b3-profile/profile-reducer";
import {recoverReducer} from "./b4-recover/recover-reducer";
import {newPasswordReducer} from "./b5-newPassword/new-password-reducer";


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