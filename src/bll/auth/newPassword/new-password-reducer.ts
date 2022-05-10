import {AppThunk} from "../../store";
import {authAPI, NewPasswordDataType} from "../../../api/api";
import {setAppError, setIsAppFetching} from '../../app/app-reducer';
import axios from 'axios';

export enum NEW_PASSWORD_ACTIONS_TYPE {
    SAVE_NEW_PASSWORD = 'SAVE_NEW_PASSWORD',
}

const initialState = {
    isNewPasswordSet: false
};
type InitialStateType = typeof initialState
export type NewPasswordActionsType = ReturnType<typeof saveNewPassword>

export const newPasswordReducer = (state: InitialStateType = initialState, action: NewPasswordActionsType): InitialStateType => {
    switch (action.type) {
        case NEW_PASSWORD_ACTIONS_TYPE.SAVE_NEW_PASSWORD:
            return {...state, isNewPasswordSet: action.isNewPasswordSet}
        default:
            return state
    }
}

export const saveNewPassword = (isNewPasswordSet: boolean) => {
    return {
        type: NEW_PASSWORD_ACTIONS_TYPE.SAVE_NEW_PASSWORD,
        isNewPasswordSet,
    }
}
//THUNKS
export const saveNewPasswordTC = (data: NewPasswordDataType): AppThunk => dispatch => {
    dispatch(setIsAppFetching(true))
    authAPI.setNewPassword(data)
        .then((res) => {
            console.log(res.data)
            dispatch(saveNewPassword(true))
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
}