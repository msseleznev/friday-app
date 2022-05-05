import {Dispatch} from "redux";
import {authAPI} from "../../../api/api";
import axios from "axios";

const initialState = {
    redirectToLogin: false,
    isLoading: false,
    error: ''
}

//REDUCER

export const registrationReducer = (state: InitialStateType = initialState, action: SignUpActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/TO_LOGIN':
            return {...state, redirectToLogin: action.redirectToLogin}
        case 'REGISTRATION/SET_ERROR':
            return {...state, error: action.error}
        case 'REGISTRATION/SET_LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}


//ACTIONS

export const setRedirectToLoginAC = (redirectToLogin: boolean) => ({
    type: 'REGISTRATION/TO_LOGIN',
    redirectToLogin
} as const)
export const setRegistrationErrorAC = (error: string) => ({type: 'REGISTRATION/SET_ERROR', error} as const)
export const setRegistrationIsLoadingAC = (isLoading: boolean) => ({
    type: 'REGISTRATION/SET_LOADING',
    isLoading
} as const)

//THUNKS

export const registerTC = (email: string, password: string, password2: string) => (dispatch: Dispatch<SignUpActionsType>) => {
    setRegistrationIsLoadingAC(true)
    if (password !== password2) {
        dispatch(setRegistrationErrorAC('Typed passwords are different!'))
        dispatch(setRegistrationIsLoadingAC(false))
    } else {
        authAPI.register(email, password)
            .then(response => {
                dispatch(setRedirectToLoginAC(true))
                console.log(response)
            })
            .catch((error) => {
                if (axios.isAxiosError({error})) dispatch(setRegistrationErrorAC(error.response.data.error))
                else (dispatch(setRegistrationErrorAC('Some error occurred')))
            })
            .finally(() => setRegistrationIsLoadingAC(false))
    }
}
//TYPE

type InitialStateType = typeof initialState

//типизация ошибки в Санке
// type ErrorType = {
//     error: string
// }

type setRedirectToLoginActionType = ReturnType<typeof setRedirectToLoginAC>
type setRegistrationErrorActionType = ReturnType<typeof setRegistrationErrorAC>
type setRegistrationIsLoadingActionType = ReturnType<typeof setRegistrationIsLoadingAC>

//Переимеовал ActionsType в SignUpActionsType
export type SignUpActionsType = setRedirectToLoginActionType
    | setRegistrationErrorActionType
    | setRegistrationIsLoadingActionType
