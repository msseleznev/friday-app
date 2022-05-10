import { Dispatch } from "redux"
import { authAPI } from "../../../api/api"
import {ActionsType, AppThunk} from "../../store";
import {setAppError, setIsAppFetching} from '../../app/app-reducer';

export enum RECOVER_ACTIONS_TYPE {
    SET_SENT_INSTRUCTIONS = 'SET_SENT_INSTRUCTIONS',
}


const initialState = {
    isSentInstructions: false
}
type InitialStateType = typeof initialState

export const recoverReducer = (state: InitialStateType = initialState, action: RecoverActionsType): InitialStateType => {
    switch (action.type) {
        case RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS:
            return {...state, isSentInstructions: action.isSentInstructions}
        default:
            return state
    }
}

export const setSentInstruction = (isSentInstructions: boolean)  => {
    return {
        type: RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS,
        isSentInstructions,
    }
}

export type RecoverActionsType = ReturnType<typeof setSentInstruction>

//THUNKS
export const recoverTC = (email: string):AppThunk => dispatch => {
    dispatch(setIsAppFetching(true))
    authAPI.forgot(email)
        .then((res) => {
            console.log(res.data)
            dispatch(setSentInstruction(true))
        })
        .catch((e) => {
            console.log('Error: ', {...e})
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            alert(error)
        })
        .finally(()=>{
            dispatch(setIsAppFetching(false))
        })
}


