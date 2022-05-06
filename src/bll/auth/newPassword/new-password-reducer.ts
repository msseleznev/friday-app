import {Dispatch} from "redux";
import {ActionsType} from "../../store";
import {authAPI, NewPasswordDataType} from "../../../api/api";

export enum NEW_PASSWORD_ACTIONS_TYPE {
    SAVE_NEW_PASSWORD = 'SAVE_NEW_PASSWORD',
}

const initialState = {
    isFetching: false
}
type InitialStateType = typeof initialState
export type NewPasswordActionsType = ReturnType<typeof saveNewPassword>

export const newPasswordReducer = (state: InitialStateType = initialState, action: NewPasswordActionsType): InitialStateType => {
    switch (action.type) {
        case NEW_PASSWORD_ACTIONS_TYPE.SAVE_NEW_PASSWORD:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const saveNewPassword = (isFetching: boolean) => {
    return {
        type: NEW_PASSWORD_ACTIONS_TYPE.SAVE_NEW_PASSWORD,
        isFetching,
    }
}
//THUNKS
export const saveNewPasswordTC = (data: NewPasswordDataType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.setNewPassword(data)
        .then((res) => {
            console.log(res.data)
            dispatch(saveNewPassword(true))
        })
        .catch((e) => {
            console.log('Error: ', {...e})
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            alert(error)
        })
}