import {RECOVER_ACTIONS_TYPE, RecoverReducerType} from "./recover-actions";


const initialState = {}
type InitialStateType = typeof initialState

export const recoverReducer = (state: InitialStateType = initialState, action: RecoverReducerType): InitialStateType => {
    switch (action.type) {
        case RECOVER_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}