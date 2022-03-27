import {NEW_PASSWORD_ACTIONS_TYPE, NewPasswordReducerType} from "./new-password-actions";


const initialState = {}
type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: NewPasswordReducerType): InitialStateType => {
    switch (action.type) {
        case NEW_PASSWORD_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}