import {REGISTRATION_ACTIONS_TYPE, RegistrationReducerType} from "./registration-actions";


const initialState = {}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationReducerType): InitialStateType => {
    switch (action.type) {
        case REGISTRATION_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}