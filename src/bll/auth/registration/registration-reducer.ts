import {Dispatch} from "redux";
import {authAPI} from "../../../api/api";
import axios, {AxiosError} from "axios";

const initialState = {redirectToLogin: false}

//REDUCER

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/TO_LOGIN':
            return {...state, redirectToLogin: action.redirectToLogin}
        default:
            return state
    }
}


//ACTIONS

export const setRedirectStatusAC = (redirectToLogin: boolean) => ({type: 'REGISTRATION/TO_LOGIN', redirectToLogin} as const)

//THUNKS

type ErrorType = {
error: string
}

export const registerTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.register(email, password)
        .then(response => {
            dispatch(setRedirectStatusAC(true))
            console.log(response)
        })
        .catch((error: AxiosError<ErrorType>) => {
            if(axios.isAxiosError(error) && error.response) console.log(error.response.data.error)
        })
}

//TYPE
type InitialStateType = typeof initialState
type TestActionType = ReturnType<typeof setRedirectStatusAC>
type ActionsType = TestActionType
