import {authAPI} from "../../../api/api";
import {AppThunk} from '../../store';
import {setAppError, setAppMessage, setIsAppFetching} from '../../app/app-reducer';
import axios from 'axios';
import {MESSAGES_FOR_SUCCESS_BAR} from '../../../ui/common/SnackBar/SnackBar';

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
} as const);

//THUNKS

export const registerTC = (email: string, password: string): AppThunk => dispatch => {
    setIsAppFetching(true)
    authAPI.register(email, password)
        .then(() => {
            dispatch(setRedirectToLoginAC(true));
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.REGISTRATION_COMPLETED_SUCCESSFULLY))
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppError(data.error || 'Some error occurred'));
            } else (dispatch(setAppError(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(() => {
            dispatch(setIsAppFetching(false))
        })
};
//TYPE

type InitialStateType = typeof initialState
type setRedirectToLoginActionType = ReturnType<typeof setRedirectToLoginAC>

//Переимеовал ActionsType в SignUpActionsType
export type SignUpActionsType = setRedirectToLoginActionType
