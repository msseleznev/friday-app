import {PROFILE_ACTIONS_TYPE, ProfileReducerType} from "./profile-actions";


const initialState = {}
type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerType): InitialStateType => {
    switch (action.type) {
        case PROFILE_ACTIONS_TYPE.TEST_ACTION:
            return {...state}
        default:
            return state
    }
}