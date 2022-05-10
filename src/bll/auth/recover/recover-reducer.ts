import { Dispatch } from "redux"
import { authAPI } from "../../../api/api"
import {ActionsType} from "../../store";

export enum RECOVER_ACTIONS_TYPE {
    SET_SENT_INSTRUCTIONS = 'SET_SENT_INSTRUCTIONS',
}


const initialState = {
    isFetching: false
}
type InitialStateType = typeof initialState

export const recoverReducer = (state: InitialStateType = initialState, action: RecoverActionsType): InitialStateType => {
    switch (action.type) {
        case RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

export const setSentInstruction = (isFetching: boolean)  => {
    return {
        type: RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS,
        isFetching,
    }
}

export type RecoverActionsType = ReturnType<typeof setSentInstruction>

//THUNKS
export const recoverTC = (email: string) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.forgot(email)
        .then((res) => {
            dispatch(setSentInstruction(true))
        })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            alert(error)
        })
}


