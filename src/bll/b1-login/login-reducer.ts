import {LOGIN_ACTIONS_TYPE, LoginReducerType} from "./login-actions";


const initialState = {}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: LoginReducerType): InitialStateType => {
    switch (action.type) {
        case LOGIN_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}