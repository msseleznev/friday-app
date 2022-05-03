
export enum RECOVER_ACTIONS_TYPE {
    SET_SENT_INSTRUCTIONS = 'SET_SENT_INSTRUCTIONS',
}


const initialState = {
    isFetching: false
}
type InitialStateType = typeof initialState

export const recoverReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS:
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}


type SentInstructionType = {
    type: RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS
    isFetching: boolean
}
export type RecoverReducerType = SentInstructionType

export const setSentInstruction = (isFetching: boolean):SentInstructionType  => {
    return {
        type: RECOVER_ACTIONS_TYPE.SET_SENT_INSTRUCTIONS,
        isFetching,
    }
}

type ActionsType = ReturnType<typeof setSentInstruction>