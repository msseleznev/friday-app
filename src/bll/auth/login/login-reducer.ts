import {authAPI, LoginParamsType} from "../../../api/api";
import {Dispatch} from "redux";

export enum LOGIN_ACTIONS_TYPE {
    SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
}

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_ACTIONS_TYPE.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export const setIsLoggedIn = (isLoggedIn: boolean) =>
    ({type: LOGIN_ACTIONS_TYPE.SET_IS_LOGGED_IN,  isLoggedIn} as const)

//THUNKS
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            console.log('Error: ', {...e})
        })
}



type ActionsType = ReturnType<typeof setIsLoggedIn>



