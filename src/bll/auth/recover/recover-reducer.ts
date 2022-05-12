import {authAPI} from "../../../api/api"
import {AppThunk} from "../../store";
import {setAppError, setIsAppFetching} from '../../app/app-reducer';
import axios from 'axios';

export enum RECOVER_ACTIONS_TYPE {
    SET_SENT_INSTRUCTIONS = 'SET_SENT_INSTRUCTIONS',
}

const initialState = {
    isSentInstructions: false
};
type InitialStateType = typeof initialState

export const recoverReducer = (state: InitialStateType = initialState, action: RecoverActionsType): InitialStateType => {
    switch (action.type) {
        case RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS:
            return {...state, isSentInstructions: action.isSentInstructions}
        default:
            return state
    }
}

export const setSentInstruction = (isSentInstructions: boolean) => {
    return {
        type: RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS,
        isSentInstructions,
    }
}

export type RecoverActionsType = ReturnType<typeof setSentInstruction>

//THUNKS
export const recoverTC = (email: string): AppThunk => dispatch => {
    dispatch(setIsAppFetching(true))
    authAPI.forgot(email)
        .then((res) => {
            dispatch(setSentInstruction(true))
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


