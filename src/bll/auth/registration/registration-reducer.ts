import {authAPI} from "../../../api/api";
import {AppThunk} from '../../store';
import {setAppError, setIsAppFetching} from '../../app/app-reducer';

const initialState = {
    redirectToLogin: false,
}

//REDUCER

export const registrationReducer = (state: InitialStateType = initialState, action: SignUpActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/TO_LOGIN':
            return {...state, redirectToLogin: action.redirectToLogin}
        default:
            return state
    }
}


//ACTIONS

export const setRedirectToLoginAC = (redirectToLogin: boolean) => ({
    type: 'REGISTRATION/TO_LOGIN',
    redirectToLogin
} as const)

//THUNKS

export const registerTC = (email: string, password: string): AppThunk => dispatch => {
    setIsAppFetching(true)
    authAPI.register(email, password)
        .then(() => {
            dispatch(setRedirectToLoginAC(true));
        })
        .catch(e => {
            const error = e.response && e.response.data ? e.response.data.error : e.message + ', more details in the console';
            console.log('Error: ', {...e})
            dispatch(setAppError(error))
        })
        .finally(() => {
            dispatch(setIsAppFetching(false))
        })
};
//TYPE

type InitialStateType = typeof initialState

//типизация ошибки в Санке
// type ErrorType = {
//     error: string
// }

type setRedirectToLoginActionType = ReturnType<typeof setRedirectToLoginAC>

//Переимеовал ActionsType в SignUpActionsType
export type SignUpActionsType = setRedirectToLoginActionType
