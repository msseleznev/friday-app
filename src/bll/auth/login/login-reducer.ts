import {authAPI, LoginParamsType} from "../../../api/api";
import {ProfileActionsType, setUserData} from "../../profile/profile-reducer";
import {setAppError, SetAppErrorActionType, setAppMessage, setIsAppFetching} from "../../app/app-reducer";
import {AppThunk} from "../../store";
import axios from 'axios';
import {MESSAGES_FOR_SUCCESS_BAR} from '../../../ui/common/SnackBar/SnackBar';

export enum LOGIN_ACTIONS_TYPE {
    SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
}

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_ACTIONS_TYPE.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export const setIsLoggedIn = (isLoggedIn: boolean) =>
    ({type: LOGIN_ACTIONS_TYPE.SET_IS_LOGGED_IN, isLoggedIn} as const)

//THUNKS
export const loginTC = (data: LoginParamsType): AppThunk => dispatch => {
    dispatch(setIsAppFetching(true))
    authAPI.login(data)
        .then((res) => {
            dispatch(setUserData(res.data))
            dispatch(setIsLoggedIn(true))
            dispatch(setAppMessage(MESSAGES_FOR_SUCCESS_BAR.LOGGED_IN_SUCCESSFULLY))
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
export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setIsAppFetching(true))
    authAPI.logout()
        .then(() => {
            dispatch(setIsLoggedIn(false))
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


//Переимеовал ActionsType в LoginActionsType
export type LoginActionsType = ReturnType<typeof setIsLoggedIn>
    | ProfileActionsType
    | SetAppErrorActionType



